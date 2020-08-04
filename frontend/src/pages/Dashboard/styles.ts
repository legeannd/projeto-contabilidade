import styled from 'styled-components';

export const Container = styled.div`
  background: #f0f0f0;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #000;
  line-height: 56px;
  text-align: center;
  width: 100%;
  margin-bottom: 50px;
  flex-shrink: 0;
`;

export const Form = styled.form`
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;

  input,
  textarea {
    width: 600px;
    background: #fff;
    padding: 16px;
    border: 0px;
    border-radius: 5px;
  }

  textarea {
    margin-top: 20px;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    resize: none;
    height: 100px;
  }

  button {
    margin-top: 20px;
    width: 200px;
    background: #11ff90;
    color: #000;
    padding: 16px;
    border: 0px;
    border-radius: 5px;
    transition: background 0.2s;

    &:hover {
      background: #11a080;
    }
  }
`;

export const EntryItem = styled.div`
  background: #fff;
  border-radius: 5px;
  width: 700px;
  max-height: 400px;
  overflow-y: auto;
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;

  & + & {
    margin-top: 20px;
  }

  strong {
    margin: 16px 0 0 16px;
    font-size: 32px;
  }

  p {
    margin: 0 0 16px 16px;
  }

  button {
    background: #fff;
    border: 1px solid black;
    border-radius: 5px;
    width: 100%;
    margin: 20px;
    transition: background 0.2s;

    &:hover {
      background: rgba(1, 1, 1, 0.1);
    }
  }
`;
