import { css } from 'lit';

const chatStyle = css`
  :host {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'header'
      'messages'
      'input';
  }
  chat-header {
    grid-area: header;
  }
  chat-messages {
    scroll-behavior: smooth;
    grid-area: messages;
    overflow: auto;
  }
  chat-input {
    grid-area: input;
    z-index: 1000;
  }
  .chat-background {
    grid-column: 1;
    grid-row-start: 2;
    grid-row-end: 4;
  }
`;
export default chatStyle;
