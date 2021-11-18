import '@material/mwc-button';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { signInWithGoogle } from '~src/utils/auth';

@customElement('chat-login')
export default class ChatLogin extends LitElement {
  static override styles = [
    css`
      :host {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        padding: 2rem;
        background: white;
        display: flex;
        font-size: 1.6rem;
        flex-direction: column;
        border-radius: 0.5rem;
        align-items: center;
        justify-content: center;
      }
      h1 {
        text-align: center;
      }
    `
  ];
  override render() {
    return html`
      <h1>Welcome the Rose kindergarden app</h1>
      <mwc-button @click=${() => signInWithGoogle()} raised label="google signin"></mwc-button>
    `;
  }
}
