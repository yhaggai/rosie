import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { throttle } from '~src/utils';
import { addMesasge, setUserTyping } from '~src/utils/chat';
import chatInputStyle from './chat_input_style';

@customElement('chat-input')
export default class ChatInput extends LitElement {
  @query('input', true) textInputElem!: HTMLInputElement;
  static override styles = [chatInputStyle];
  throttledSetUserTyping = throttle(setUserTyping, 3000);
  private async sendMesasge(message: string) {
    this.textInputElem.value = '';
    addMesasge(message);
  }
  private onSendButtonPressed() {
    this.sendMesasge(this.textInputElem.value);
  }
  private onKeyDown(event: KeyboardEvent) {
    const message = this.textInputElem.value;
    this.throttledSetUserTyping();
    if (event.key === 'Enter' && !!message) {
      this.sendMesasge(message);
      return;
    }
  }

  override render() {
    return html`
      <input @keydown=${this.onKeyDown} type="text" placeholder="Message" />
      <button @click=${this.onSendButtonPressed}>»</button>
    `;
  }
}
