import { onAuthStateChanged } from 'firebase/auth';
import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { auth } from './utils/auth';
import './screens/chat';
import './screens/login-screen';

@customElement('app-index')
export class App extends LitElement {
  @query('#app', true) _app!: HTMLInputElement;
  @state()
  _isAuthed = false;
  @state()
  _loading = true;
  override render() {
    if (this._loading) {
      return html`<div>loading</div>`;
    }
    return html`
      <div id="app">
        ${this._isAuthed ? html`<chat-app></chat-app>` : html`<chat-login></chat-login>`}
      </div>
    `;
  }

  override firstUpdated() {
    onAuthStateChanged(auth, async (user) => {
      this._isAuthed = !!user;
      this._loading = false;
    });
  }
}
