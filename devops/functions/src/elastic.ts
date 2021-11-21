import { Client } from '@elastic/elasticsearch';
import { ChatMessage } from '../../../client/src/types';
import { functions } from './firebase';
const { username, password, url } = functions.config().elastic;

const client = new Client({
  node: url,
  auth: { username, password }
});

const INDEX_NAME = 'messages';

export async function searchForAnswerForSimilarQuestion(
  question: string
): Promise<ChatMessage | null> {
  console.log('asking: ', question);
  const results = await client.search({
    index: INDEX_NAME,

    body: {
      min_score: 3,
      size: 1,
      query: {
        match: { content: question }
      }
    }
  });

  const [result = {}] = results.body.hits.hits;
  const message = result._source as ChatMessage | null;
  console.log('the question is ', JSON.stringify(message));

  return message ? getTheMessageBelow(message.timestamp) : null;
}

async function getTheMessageBelow(timestamp: number): Promise<ChatMessage> {
  console.log('getting answer for : ', timestamp);
  const res = await client.search({
    index: INDEX_NAME,
    body: {
      sort: [{ timestamp: 'asc' }],
      size: 1,
      query: {
        range: {
          timestamp: { gt: timestamp }
        }
      }
    }
  });
  const [message = {}] = res.body.hits.hits;
  console.log('the answer is ', JSON.stringify(message));
  return message._source;
}

export async function indexMessage(message: ChatMessage) {
  return await client.index({
    index: INDEX_NAME,
    body: message
  });
}
