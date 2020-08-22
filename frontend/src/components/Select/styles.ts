import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin-bottom: 5px;
  }

  select {
    height: 40px;
    font-size: 20px;
    padding-left: 8px;
    border: 1px solid transparent;
    border-radius: 5px;

    &:focus {
      border: 1px solid #4030f0;
    }

    option {
      font-size: 20px;
    }
  }
`;
