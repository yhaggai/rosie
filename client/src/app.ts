import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { attachRouter } from './utils/router';

@customElement('app-index')
export class App extends LitElement {
  @query('#app', true) _app!: HTMLInputElement;
  override render() {
    return html` <div id="app" />`;
  }

  override firstUpdated() {
    attachRouter(this._app);
  }
}
