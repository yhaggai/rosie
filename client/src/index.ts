import { html, render } from 'lit';
// import './screens/chat';
// import './screens/login-screen';
import './app';

// const Chat = html`<chat-app></chat-app>`;
// const Login = html`<chat-login-screen></chat-login-screen>`;
const App = html`<app-index></app-index>`;
render(App, (document as any).getElementById('root'));
