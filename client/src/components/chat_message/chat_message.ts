import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { getColor } from '~src/utils';
import chatMesageStyle from './chat_message_style';

function getTimeFromTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

@customElement('chat-message')
export default class ChatMessage extends LitElement {
  @property({ type: String })
  sender = '';
  @property({ type: Number })
  timestamp = 0;
  @property({ type: String })
  profileImageUrl = '';
  static override styles = chatMesageStyle;
  override render() {
    return html`
      <img class="message__avatar" src=${this.profileImageUrl} />
      <div class="message__sender" style="color:var(${unsafeCSS(getColor(this.sender))})">
        ${this.sender}
      </div>
      <slot class="message__content"></slot>
      <div class="message__time">${getTimeFromTimestamp(this.timestamp)}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-message': ChatMessage;
  }
}
