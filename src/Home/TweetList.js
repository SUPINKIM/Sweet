import React, { useEffect, useState } from 'react';
import database, { PROFILE_DEFAULT_IMG } from '../API/Database';
import Loading from '../Pages/Loading';
import {
  databaseInstance,
  ref,
  get,
  child,
  onValue,
} from '../Firebase/firebase';

import {
  ProfileContainer,
  ProfileImgContainer,
  TextContainer,
  ListForm,
  Container,
  ImageContainer,
  LikeButton,
  Hashtags,
  HashtagsContainer,
  SocialBox,
  LikesContainer,
  SearchBarInput,
  SearchButton,
  SearchBarContainer,
  SpanEmail,
  SpanName,
} from '../Styles/TweetListStyles';

const notFoundUserInfo = { username: '익명', profileImg: PROFILE_DEFAULT_IMG };

const SocialContainer = ({
  hashtag,
  likes,
  timestamp,
  tweetId,
  likesTweets,
  search,
  filterLists,
}) => {
  const [tweetLike, setTweetLike] = useState(likes);
  const [selected, setSelected] = useState(false);
  const [selectedHash, setSelectedHash] = useState(false);

  useEffect(() => {
    if (likesTweets.includes(tweetId)) {
      setSelected(true);
    }
  }, []);

  useEffect(() => {
    filterLists();
  }, [selectedHash]);

  const onHandleClickLikeButton = (event) => {
    const { updateUserLikesTweets, updateTweetLikes } = database;
    setSelected(!selected);
    updateUserLikesTweets(tweetId, !selected);
    updateTweetLikes(tweetId, !selected);
    selected ? setTweetLike(tweetLike - 1) : setTweetLike(tweetLike + 1);
  };

  const onHandleClickHashtags = (event, tag) => {
    search.setSearchWord(tag);
    setSelectedHash(!selectedHash);
  };

  return (
    <SocialBox>
      <HashtagsContainer>
        {hashtag?.length &&
          hashtag.map((tag, index) => (
            <Hashtags
              key={`${timestamp}_${index}_hashtag`}
              onClick={(event) => onHandleClickHashtags(event, tag)}
            >
              #{tag}
            </Hashtags>
          ))}
      </HashtagsContainer>
      <LikesContainer>
        <LikeButton onClick={onHandleClickLikeButton}>
          {selected ? (
            <i className='fas fa-heart'></i>
          ) : (
            <i className='far fa-heart'></i>
          )}
        </LikeButton>
        <SpanName>{tweetLike}</SpanName>
      </LikesContainer>
    </SocialBox>
  );
};

const UserContainer = ({ user }) => {
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    get(child(ref(databaseInstance), `users/user-${user}`))
      .then((response) => {
        setUserInfo(response.val());
      })
      .catch((error) => setUserInfo(notFoundUserInfo));

    return () => setUserInfo(null);
  }, []);

  return (
    userInfo && (
      <ProfileContainer>
        <ProfileImgContainer imgUrl={userInfo.profileImg} />
        <SpanName>{userInfo.username}</SpanName>
        <SpanEmail>({userInfo?.email})</SpanEmail>
      </ProfileContainer>
    )
  );
};

const ListContainer = ({ contents, likesTweets, search, filterLists }) => {
  const { hashtag, images, likes, text, userId, timestamp, tweetId } = contents;

  return (
    <ListForm>
      <UserContainer user={userId} />
      <TextContainer name='tweet_contents'>{text}</TextContainer>
      {images?.length &&
        images.map((img, index) => (
          <ImageContainer imageUrl={img} key={`${timestamp}_${index}_image`} />
        ))}
      <SocialContainer
        hashtag={hashtag}
        likes={likes}
        timestamp={timestamp}
        tweetId={tweetId}
        likesTweets={likesTweets}
        search={search}
        filterLists={filterLists}
      />
    </ListForm>
  );
};

const SearchBar = ({ search, filterLists }) => {
  const onHandleClick = (event) => {
    filterLists();
  };

  const onHandleChange = (event) => {
    search.setSearchWord(event.target.value);
  };

  const onHandleKeyUp = (event) => {
    if (event.key === 'Enter') {
      filterLists();
    }
  };

  return (
    <SearchBarContainer>
      <SearchBarInput
        name='search_container'
        placeholder='내용 또는 해시태그로 검색하기'
        value={search.searchWord}
        onChange={onHandleChange}
        onKeyUp={onHandleKeyUp}
      />
      <SearchButton onClick={onHandleClick}>
        <i className='fas fa-search' />
      </SearchButton>
    </SearchBarContainer>
  );
};

const TweetList = () => {
  const [loading, setLoading] = useState(true);
  const [tweetList, setTweetList] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [unfilteredLists, setUnfilteredLists] = useState('');

  /* 로그인한 유저가 '좋아요'를 누른 트윗 목록 */
  const [socialLikeTweets, setSocialLikeTweets] = useState([]);

  const listenTweetDB = () => {
    const tweetRef = ref(databaseInstance, 'tweets/');
    onValue(tweetRef, (snapshot) => {
      if (snapshot.val()) {
        const now = Object.values(snapshot.val());
        const temp = [];
        now.forEach((list) => {
          temp.push(list);
        });
        temp.sort((list1, list2) => list2.timestamp - list1.timestamp);
        setTweetList(temp);
        setUnfilteredLists(temp);
        setSearchWord('');
      }
    });
  };

  const filterLists = (reset = false) => {
    if (reset) {
      setTweetList(unfilteredLists);
    } else {
      const temp = [];
      for (let i = 0; i < unfilteredLists.length; i++) {
        const { text, hashtag } = unfilteredLists[i];
        if (
          text.includes(searchWord) ||
          (hashtag && hashtag.includes(searchWord))
        ) {
          temp.push(unfilteredLists[i]);
        }
      }
      setTweetList(temp);
    }
  };

  useEffect(() => {
    if (!searchWord) {
      filterLists(true);
    }
  }, [searchWord, unfilteredLists]);

  useEffect(() => {
    listenTweetDB();
    setUnfilteredLists([...tweetList]);
  }, [loading]);

  useEffect(() => {
    const { fetchData, fetchUserLikedTweet } = database;
    fetchData('tweets')
      .then((response) => {
        response.data.sort((list1, list2) => list2.timestamp - list1.timestamp);
        setTweetList(response.data);
        fetchUserLikedTweet()
          .then(({ success, likeTweets }) => {
            if (success) {
              setSocialLikeTweets(likeTweets);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => console.log(error));

    return () => {
      setSearchWord('');
      setLoading(true);
    };
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SearchBar
            search={{ searchWord, setSearchWord }}
            filterLists={filterLists}
          />
          {tweetList.length ? (
            tweetList.map((list) => (
              <ListContainer
                key={list.timestamp}
                contents={list}
                likesTweets={socialLikeTweets}
                search={{ searchWord, setSearchWord }}
                filterLists={filterLists}
              />
            ))
          ) : (
            <div>작성된 sweet이 없습니다 😢</div>
          )}
        </>
      )}
    </Container>
  );
};

export default TweetList;
