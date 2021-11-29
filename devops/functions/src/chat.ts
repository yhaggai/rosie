import { indexMessage, searchForAnswerForSimilarQuestion } from './elastic';
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.

// The Firebase Admin SDK to access Firestore.
import { ChatMessage } from '../../../client/src/types';
import { admin, functions } from './firebase';

const BOT_IMAGE_URL =
  'https://res.cloudinary.com/dicgafcrn/image/upload/c_scale,w_100/v1637246398/bot.png';

const BOT_ID = '__bot__';

function createMessage(answer: string, questionMessage: ChatMessage) {
  return {
    content: answer,
    questionMessage,
    timestamp: Date.now(),
    displayName: 'Rose (bot)',
    profilePictureUrl: BOT_IMAGE_URL,
    userUID: BOT_ID
  };
}
function insertBotResponse(answer: string, questionMessage: ChatMessage) {
  const db = admin.database();
  const timestamp = Date.now();
  const ref = db.ref(`chat/${timestamp}`);
  return ref.set(createMessage(answer, questionMessage));
}

function isMessageAQuestion(message: ChatMessage) {
  return message.content.indexOf('?') > -1;
}

async function checkBotForAnswer(message: ChatMessage) {
  if (!isMessageAQuestion(message)) {
    return;
  }
  const anwser = await searchForAnswerForSimilarQuestion(message.content);
  if (!anwser) {
    return;
  }
  await insertBotResponse(anwser.content, message);
}

export function indexMessageToElastic() {
  return functions.database.ref('chat/{messageId}').onCreate(async (snanpShot, context) => {
    const message = snanpShot.val() as ChatMessage;
    if (message.userUID === BOT_ID) {
      return;
    }
    await indexMessage(message);
    await checkBotForAnswer(message);
  });
}
