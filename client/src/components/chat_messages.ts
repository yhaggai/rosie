import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ChatMessage } from '~src/types';
import './chat_message/chat_message';
import { getUserData } from '~src/utils/chat';
import classnames from 'classnames';
import { isMessageBot } from '~src/utils';

function isMessageIsMine(message: ChatMessage) {
  const user = getUserData();
  return user.userUID === message.userUID;
}

function buildBotMessageContent(message: ChatMessage) {
  const questionMessage = message.questionMessage as ChatMessage;
  const [inquierName = ''] = questionMessage.displayName.split(' ');
  return html`<span
    ><b style="text-transform: capitalize">${inquierName}</b>, you asked:
    <i>"${message.questionMessage?.content}"</i>.<br />
    Here's a possible answer: <b>${message.content}</b></span
  >`;
}

@customElement('chat-messages')
export default class ChatMessages extends LitElement {
  @property({ type: Array }) messages: ChatMessage[] = [];
  static override styles = [
    css`
      :host {
        position: relative;
        height: 98%;
        display: flex;
        flex-direction: column;
        padding: 0 1rem 0 3rem;
        margin-bottom: 1rem;
      }
      chat-message {
        margin-top: 3rem;
      }
    `
  ];

  override render() {
    return html`
      ${repeat(this.messages, (message) => {
        const { content: orignalContent, profilePictureUrl, displayName, timestamp } = message;
        const isBot = isMessageBot(message);
        const content = isBot ? buildBotMessageContent(message) : orignalContent;

        return html`<chat-message
          profileImageUrl=${profilePictureUrl}
          class=${classnames({ me: isMessageIsMine(message), bot: isMessageBot(message) })}
          sender=${displayName}
          timestamp=${timestamp}
          >${content}</chat-message
        >`;
      })}
    `;
  }
}
