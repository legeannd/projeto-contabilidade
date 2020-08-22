import styled from 'styled-components';

export const Container = styled.div`
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 48px;
  margin-bottom: 30px;
  width: 100%;
`;

export const Subtitle = styled.h2`
  margin-top: 50px;
  font-weight: normal;
  font-size: 24px;
  width: 100%;
`;

export const Body = styled.div`
  max-width: 1120px;
  width: 100%;
`;

export const SearchField = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;

  input {
    width: 75%;
    height: 60%;
    font-size: 24px;
    padding-left: 16px;
    border: 0;
    border-radius: 5px;

    &:focus {
      border: 1px solid #4030f0;
    }
  }

  button {
    width: 20%;
    height: 60%;
    border: 0;
    border-radius: 5px;
    font-size: 24px;
    background: #4030f0;
    color: #fff;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const EntryForm = styled.form`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  input {
    height: 60px;
    font-size: 24px;
    padding-left: 16px;
    border: 0;
    border-radius: 5px;

    &:focus {
      border: 1px solid #4030f0;
    }
  }

  textarea {
    width: 60%;
    height: 140px;
    font-size: 24px;
    font-family: Roboto, sans-serif;
    padding: 16px 0 0 16px;
    border: 0;
    border-radius: 5px;
    resize: none;

    &:focus {
      border: 1px solid #4030f0;
    }

    &::placeholder {
      font-family: Roboto, sans-serif;
    }
  }

  button {
    height: 60px;
    border: 0;
    border-radius: 5px;
    font-size: 24px;
    background: #4030f0;
    color: #fff;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const AccountsForm = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    width: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  input {
    height: 60px;
    font-size: 24px;
    padding-left: 16px;
    border: 0;
    border-radius: 5px;

    &:focus {
      border: 1px solid #4030f0;
    }
  }

  textarea {
    width: 60%;
    height: 320px;
    font-size: 24px;
    font-family: Roboto, sans-serif;
    padding: 16px 0 0 16px;
    border: 0;
    border-radius: 5px;
    resize: none;

    &:focus {
      border: 1px solid #4030f0;
    }

    &::placeholder {
      font-family: Roboto, sans-serif;
    }
  }

  button {
    height: 60px;
    border: 0;
    border-radius: 5px;
    font-size: 24px;
    background: #4030f0;
    color: #fff;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const AccountsCreated = styled.div`
  margin-top: 30px;
  width: 100%;
  max-height: 800px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .account {
    width: 550px;
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    margin: 10px 10px 0 0;
    background: #a0d0f5;
    color: #000;
    border-radius: 5px;
    justify-content: space-between;

    div {
      display: flex;
      width: 40%;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 10px;
      margin-right: 0px;
      justify-content: space-between;
    }
  }

  span {
    font-size: 16px;
    height: 30px;

    span {
      font-size: 20px;
    }
  }

  .description {
    height: 100%;
    width: 55%;
    padding: 10px 20px 0 10px;
    overflow-x: auto;
  }
`;

export const Entries = styled.div``;

export const NoData = styled.p`
  width: 100%;
  margin: 30px 0;
  color: #222222;
  font-size: 32px;
  text-align: center;
`;
