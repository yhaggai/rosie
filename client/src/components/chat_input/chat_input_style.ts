import { css } from 'lit';

const chatInputStyle = css`
  :host {
    display: flex;
    margin-bottom: 2rem;
    justify-content: space-between;

    background: transparent;
    padding: 1rem;
    margin: 0.2rem 2rem 2rem 1.3rem;
    border-radius: 18px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: white;
  }
  input[type='text'] {
    outline: none;
    border: none;
    flex: 1;
  }
  button {
    align-self: flex-end;
    background: white;
    outline: none;
    display: flex;
    align-items: center;
    border: none;
    cursor: pointer;
    font-size: 3rem;
    height: 3rem;
    width: 3rem;
  }
`;
export default chatInputStyle;
