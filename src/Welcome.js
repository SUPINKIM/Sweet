import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  justify-content: center;
`;

const Icon = styled.i`
  color: #e57373;
`;

const Text = styled.span`
  font-size: 18px;
`;

const Welcome = ({ sign }) => {
  return (
    <Container>
      <Icon className='fab fa-twitter fa-7x' />
      <Text>Sweet에 오신 걸 환영합니다! {sign}을 해주세요.</Text>
    </Container>
  );
};

export default Welcome;
