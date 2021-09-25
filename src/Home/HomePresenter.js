import React from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar';
import TweetCreator from './TweetCreator';
import TweetList from './TweetList';

export const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: center;
  @media (max-width: 870px) {
    height: 100vh;
    flex-direction: row;
    align-items: center;
    row-gap: 10px;
  }
`;

export const ContentsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  column-gap: 40px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 870px) {
    height: 100vh;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
  }
`;

const HomePresenter = () => {
  return (
    <HomeContainer>
      <Navbar />
      <ContentsContainer>
        <TweetCreator />
        <TweetList />
      </ContentsContainer>
    </HomeContainer>
  );
};

export default HomePresenter;
