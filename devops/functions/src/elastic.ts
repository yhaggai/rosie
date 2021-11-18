import { Client } from '@elastic/elasticsearch';
import { ChatMessage } from '../../../client~src/types';
import { functions } from './firebase';
const { username, password, url } = functions.config().elastic;

const client = new Client({
  node: url,
  auth: { username, password }
});

const INDEX_NAME = 'messages';

export async function searchForAnswerForSimilarQuestion(question: string) {
  const res = await client.search({
    index: INDEX_NAME,
    body: {
      query: {
        common: {
          content: {
            query: question
          }
        }
      }
    }
  });
  const message = res.body.hits.hits[0] as ChatMessage | null;
  return message ? getTheMessageBelow(message.timestamp) : null;
}

async function getTheMessageBelow(timestamp: number) {
  const res = await client.search({
    index: INDEX_NAME,
    body: {
      size: 1,
      query: {
        range: {
          timestamp: { gt: timestamp }
        }
      }
    }
  });
  return res.body.hits.hits[0];
}

export async function indexMessage(message: ChatMessage) {
  return await client.index({
    index: INDEX_NAME,
    body: message
  });
}
