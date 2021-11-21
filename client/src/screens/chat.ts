import { html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import '~src/components/chat_header/index';
import '~src/components/chat_input';
import '~src/components/chat_messages';
import { ChatMessage, UserTyping } from '~src/types';
import { listenToRegisteredUsers } from '~src/utils/auth';
import {
  listenToBotMessage,
  listenToIncomingMessages,
  listenToSelfMadeMessage,
  listenToUserTyping
} from '~src/utils/chat';
import chatStyle from './chat_style';

const groupDetails = (registeredUsers: number) => `${registeredUsers} members`;
const typingMessage = (name: string) => `${name} is typing`;

@customElement('chat-app')
export default class ChatApp extends LitElement {
  @query('chat-messages', true) _messagesElem!: HTMLDivElement;
  constructor() {
    super();
    listenToIncomingMessages(this.onMessageRecieved.bind(this));
    listenToRegisteredUsers(this.fetchRegisteredUsers.bind(this));
    listenToUserTyping(this.dispatchTypingEvent.bind(this));
    listenToBotMessage(this.playPingSound.bind(this));
    listenToSelfMadeMessage(this.scrollToBottom.bind(this));
  }
  static override styles = [chatStyle];
  @state()
  private _subHedaer: string = '';
  @state()
  private _registeredUsers: number | null = null;
  @state()
  private _messages: ChatMessage[] = [];
  public async onMessageRecieved(messages: [ChatMessage]) {
    this._messages = messages;
    await this.updateComplete;
  }
  public scrollToBottom() {
    this._messagesElem.scrollTop = this._messagesElem.scrollHeight;
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
  public playPingSound() {
    new Audio('https://res.cloudinary.com/dicgafcrn/video/upload/v1637449941/ping.wav').play();
  }

  override render() {
    return html`
      <chat-header headerTitle="Rose Kindergarden" subHeader=${this._subHedaer}></chat-header>
      <chat-messages .messages=${this._messages}></chat-messages>
      <chat-input></chat-input>
      <div class="chat-background"></div>
    `;
  }
}
