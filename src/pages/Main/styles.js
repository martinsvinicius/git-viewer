import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form `
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => props.error ? 'red' : '#eee'};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes `
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading
})) `
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  svg {
    padding: 0;
    margin: 0;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props => props.loading && 
    css `
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul `
  list-style: none;
  margin-top: 30px;
  
  li {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: start;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 8px;
      }
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;