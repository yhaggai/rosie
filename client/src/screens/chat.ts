import { onAuthStateChanged } from 'firebase/auth';
import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '~src/components/chat_header/index';
import '~src/components/chat_input';
import '~src/components/chat_messages';
import { ChatMessage, UserTyping } from '~src/types';
import { auth, listenToRegisteredUsers } from '~src/utils/auth';
import { listenToIncomingMessages, listenToUserTyping } from '~src/utils/chat';
import chatStyle from './chat_style';

const groupDetails = (registeredUsers: number) => `${registeredUsers} members`;
const typingMessage = (name: string) => `${name} is typing`;

@customElement('chat-app')
export default class ChatApp extends LitElement {
  constructor() {
    super();
    listenToIncomingMessages(this.getMessage.bind(this));
    listenToRegisteredUsers(this.fetchRegisteredUsers.bind(this));
    listenToUserTyping(this.dispatchTypingEvent.bind(this));
  }
  static override styles = [chatStyle];
  @state()
  private _subHedaer: string = '';
  @state()
  private _registeredUsers: number | null = null;
  @state()
  private _messages: ChatMessage[] = [];
  public getMessage(messages: [ChatMessage]) {
    this._messages = messages;
  }
  public fetchRegisteredUsers(registeredUsers: number) {
    this._registeredUsers = registeredUsers;
    this._subHedaer = groupDetails(registeredUsers);
  }
  public dispatchTypingEvent(user: UserTyping) {
    const [firstName] = user.name.split(' ');
    this._subHedaer = typingMessage(firstName);
    setTimeout(() => {
      this._subHedaer = groupDetails(this._registeredUsers as number);
    }, 3000);
  }
  override firstUpdated() {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = '/login';
      }
    });
  }

  override render() {
    console.log('calling', this._messages);
    return html`
      <chat-header headerTitle="Rose Kindergarden" subHeader=${this._subHedaer}></chat-header>
      <chat-messages .messages=${this._messages}></chat-messages>
      <chat-input></chat-input>
      <div class="chat-background"></div>
    `;
  }
}
