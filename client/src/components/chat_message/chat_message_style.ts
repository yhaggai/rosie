import { css } from 'lit';

const chatMesageStyleMe = css`
  :host(.me) {
    background-color: var(--color-rice-flower);
    align-self: flex-end;
    min-width: 60%;
  }
  :host(.me) .message__avatar {
    display: none;
  }
  :host(.me) .message__sender {
    display: none;
  }
  :host(.bot) {
    border: var(--color-electric-violet) 2px solid;
    box-shadow: 0 0 10px var(--color-electric-violet);
  }
`;

const chatMesageStyle = [
  css`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      max-width: 60%;
      background-color: #fff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 18px;
      padding: 0.7rem 1rem 0.7rem 2.5rem;
    }
    .message__sender {
      font-weight: 700;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .message__content {
      font-size: 1.2rem;
    }
    .message__time {
      align-self: flex-end;
      font-size: 0.8rem;
      color: var(--color-gray);
    }

    .message__avatar {
      position: absolute;
      height: 4rem;
      background: white;
      width: 4rem;
      object-fit: cover;
      border-radius: 50%;
      top: -2rem;
      left: -2rem;
      border: 1px solid var(--color-malibu);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  `,
  chatMesageStyleMe
];

export default chatMesageStyle;
