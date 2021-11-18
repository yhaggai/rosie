import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { Menu } from '@material/mwc-menu';
import '@material/mwc-menu';
import '@material/mwc-list/mwc-list-item';
import chatHeaderStyles from './chat_header_styles';
import { optionsIcon } from '~src/assets/icons';
import { signOut } from '~src/utils/auth';

const GROUP_IMAGE =
  'https://res.cloudinary.com/dicgafcrn/image/upload/v1637425539/kindergarden.png';

function headerDetailsTemplate({ title, subHeader }: { title: string; subHeader: string }) {
  return html` <div class="header-details">
    <h1>${title}</h1>
    <h2>${subHeader}</h2>
  </div>`;
}

@customElement('chat-header')
export default class ChatHeader extends LitElement {
  @query('mwc-menu', true) menu!: Menu;
  @property({ type: String })
  headerTitle = '';
  @property({ type: String })
  subHeader = '';
  @property({ type: Number })
  onlineMembers = 0;
  static override styles = [chatHeaderStyles];

  override render() {
    return html` <header>
      <img src=${GROUP_IMAGE} />
      ${headerDetailsTemplate({ title: this.headerTitle, subHeader: this.subHeader })}

      <div class="button" @click=${() => this.menu.show()}>${optionsIcon()}</div>
      <mwc-menu id="menu">
        <mwc-list-item @click=${() => signOut()}>Signout</mwc-list-item>
      </mwc-menu>
    </header>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-header': ChatHeader;
  }
}
