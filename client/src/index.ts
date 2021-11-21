import { html, render } from 'lit';
import './app';

navigator.serviceWorker.register(new URL('sw.js', import.meta.url), { type: 'module' });

const App = html`<app-index></app-index>`;
render(App, (document as any).getElementById('root'));
