import { onAuthStateChanged } from 'firebase/auth';
import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '@material/mwc-circular-progress';
import './screens/login-screen';
import './screens/chat';
import { auth } from './utils/auth';

import 'pwa-helper-components/pwa-install-button';
import 'pwa-helper-components/pwa-update-available';

function renderApp() {
  return html`<chat-app></chat-app>`;
}
function renderLogin() {
  return html`<chat-login-screen></chat-login-screen>`;
}

const BACKGROUND_URL =
  'https://res.cloudinary.com/dicgafcrn/image/upload/c_scale,w_1126/v1637425555/wallpaper.jpg';

@customElement('app-index')
export class App extends LitElement {
  @query('#app', true) _app!: HTMLInputElement;
  @state()
  _isAuthed = false;
  @state()
  _loading = true;
  static override styles = [
    css`
      :host {
        height: 100vh;
        display: block;
        background-image: url(${unsafeCSS(BACKGROUND_URL)});
        background-size: 100%;
      }
    `
  ];

  override render() {
    if (this._loading) {
      return html`<div style="display:flex;align-items:center;justify-content:center; height:100vh">
        <mwc-circular-progress indeterminate></mwc-circular-progress>
      </div>`;
    }
    return html` <div id="app">${this._isAuthed ? renderApp() : renderLogin()}</div> `;
  }

  override firstUpdated() {
    onAuthStateChanged(auth, async (user) => {
      this._isAuthed = !!user;
      this._loading = false;
    });
  }
}
