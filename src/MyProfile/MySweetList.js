import React, { useEffect, useState } from 'react';
import database from '../API/Database';
import Loading from '../Pages/Loading';
import styled from 'styled-components';

const ListsContainer = styled.div`
  width: 90%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #eeeeee;
  padding: 10px;
  row-gap: 10px;
`;

const ListContainer = styled.div`
  width: 70%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #eeeeee;
  padding: 10px;
  row-gap: 10px;
  @media (max-width: 870px) {
    height: 160px;
  }
`;

const Span = styled.span`
  font-size: 14px;
  color: #757575;
`;

const SpanContent = styled.span`
  font-weight: 400;
`;

const DeleteButton = styled.div`
  all: unset;
  width: 60px;
  height: 20px;
  border: 1px solid #c62828;
  cursor: pointer;
  text-align: center;
  line-height: 23px;
  font-size: 12px;
  &:hover {
    color: #fff;
    background-color: #c62828;
  }
`;

const MySweetList = () => {
  const [userTweets, setUserTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    database
      .fetchUserTweet()
      .then(({ success, response, error: e }) => {
        success ? setUserTweets(response) : setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const timeChanger = (time) => {
    const dateObj = new Date(time);
    let dateStr = `${dateObj.getFullYear()}년 ${
      dateObj.getMonth() + 1
    }월 ${dateObj.getDate()}일 작성`;

    return dateStr;
  };

  const onHandleClick = async (event, tweetid) => {
    const { removeTweet, updateUserTweetId, fetchUserTweet } = database;
    await removeTweet(tweetid);
    await updateUserTweetId(false, tweetid);
    const { success, response } = await fetchUserTweet();
    if (success) {
      setUserTweets(response);
    }
  };

  console.log(userTweets);

  return loading ? (
    <Loading />
  ) : (
    <ListsContainer>
      {error ? (
        <div>
          사용자 작성 트윗을 불러오는 데 문제가 발생했습니다. 잠시 후 새로고침
          해주세요.
        </div>
      ) : userTweets?.length && userTweets[0] !== 'none' ? (
        userTweets.map(({ timestamp, text, tweetId }) => (
          <ListContainer key={tweetId}>
            <Span name='written_time'>{timeChanger(timestamp)}</Span>
            <SpanContent name='contents'>{text}</SpanContent>
            <DeleteButton
              name='delete_button'
              onClick={(event) => onHandleClick(event, tweetId)}
            >
              삭제
            </DeleteButton>
          </ListContainer>
        ))
      ) : (
        <div>아직 작성된 sweet이 없습니다.</div>
      )}
    </ListsContainer>
  );
};

export default MySweetList;
