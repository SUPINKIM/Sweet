import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0, 8);
`;

export const Span = styled.span`
  color: #e57373;
  font-size: 30px;
  font-weight: 500;
  margin-top: 100px;
`;

const Loading = () => {
  return (
    <Container>
      <Span> Loading... </Span>
    </Container>
  );
};

export default Loading;
