import { onAuthStateChanged } from 'firebase/auth';
import { html, css, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { auth } from '~src/lib/firebase';

const BACKGROUND_URL =
  'https://res.cloudinary.com/dicgafcrn/image/upload/c_scale,w_1126/v1637425555/wallpaper.jpg';

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
        background-image: url(${unsafeCSS(BACKGROUND_URL)});
        background-size: 100%;
      }
    `
  ];
  override render() {
    return html` <chat-login> </chat-login> `;
  }
}
