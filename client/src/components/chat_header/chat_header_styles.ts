import { css } from 'lit';

const chatHeaderStyles = css`
  header {
    padding: 1rem;
    max-height: 6rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--color-botticelli);
  }
  .header-details {
    margin-left: 1rem;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  img {
    max-height: 4rem;
    max-width: 4rem;
  }
  mwc-menu {
    position: absolute;
    right: 128px;
    top: 20px;
  }
  mwc-button {
    align-self: flex-end;
  }
  h1,
  h2 {
    margin: 0;
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export default chatHeaderStyles;
