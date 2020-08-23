import styled from 'styled-components';

export const Container = styled.div`
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
