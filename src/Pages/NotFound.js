import React from 'react';
import { Container, Span } from './Loading';

const NotFound = () => {
  return (
    <Container>
      <Span>페이지를 찾을 수 없습니다.</Span>
      <Span> 주소창을 다시 확인해주세요.</Span>
    </Container>
  );
};

export default NotFound;
