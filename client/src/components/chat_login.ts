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
        font-size: 2.5rem;
      }
      .login-title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
      }
      img {
        border-radius: 50%;
        margin-right: 2rem;
        width: 5rem;
        height: 5rem;
        background-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      }
    `
  ];
  override render() {
    return html`
      <div class="login-title">
        <img
          src="https://res.cloudinary.com/dicgafcrn/image/upload/c_scale,w_100/v1637246398/bot.png"
        />
        <h1>Welcome to Rosie</h1>
      </div>

      <mwc-button @click=${() => signInWithGoogle()} raised label="google signin"></mwc-button>
    `;
  }
}
