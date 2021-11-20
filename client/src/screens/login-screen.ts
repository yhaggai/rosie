import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '~src/components/chat_login';

@customElement('chat-login-screen')
export default class ChatLoginScreen extends LitElement {
  static override styles = [
    css`
      :host {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        flex-direction: column;
        background-size: 100%;
      }
    `
  ];
  override render() {
    return html` <chat-login> </chat-login> `;
  }
}
