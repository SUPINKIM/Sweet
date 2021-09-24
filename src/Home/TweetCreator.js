import React, { useEffect, useState } from 'react';
import Hashtag from './Hashtag';
import Storage from '../API/Storage';
import {
  Container,
  TextArea,
  Label,
  File,
  AddButton,
} from '../Styles/TweetStyles';
import database from '../API/Database';

const Tweet = () => {
  const [tweetText, setTweetText] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [displayFileNames, setdisplayFileNames] = useState('파일 선택');
  const [buttonAbled, setButtonAbled] = useState(false);
  const [hashDefault, setHashDefault] = useState(false);

  useEffect(() => {
    tweetText ? setButtonAbled(true) : setButtonAbled(false);
  }, [tweetText]);

  const setDefaultTweetContainer = () => {
    setTweetText('');
    setHashtags([]);
    setSelectedFiles([]);
    setdisplayFileNames('파일선택');
    setHashDefault(true);
  };

  const onHandleClick = async () => {
    const urls = [];
    for (let file of selectedFiles) {
      try {
        const { success, message } = await Storage.uploadImages(file);
        if (success) {
          const { success: download, response } =
            await Storage.downloadImagesUrl(file);
          if (download) {
            urls.push(response);
          } else {
            throw new Error(response);
          }
        } else {
          throw new Error(message);
        }
      } catch (error) {
        alert(error);
      }
    }

    const { success, tweetId } = await database.uploadTweet(
      tweetText,
      hashtags,
      urls
    );
    if (success) {
      const { success: updateSuccess } = await database.updateUserTweetId(
        true,
        tweetId
      );

      if (!updateSuccess) {
        database.removeTweet(tweetId);
      }
    }
    setDefaultTweetContainer();
  };

  const onHandleChange = (event) => {
    setTweetText(event.target.value);
  };

  const onHandleUpload = (event) => {
    const { files } = event.target;
    let fileNames = '';
    const temp = [];

    for (let i = 0; i < files.length; i++) {
      fileNames += `${files[i].name}, `;
      temp.push(files[i]);
    }

    setdisplayFileNames(fileNames.trim() || '선택 파일 없음');
    setSelectedFiles(temp);
  };

  return (
    <Container>
      <TextArea
        name='tweet_container'
        maxLength='200'
        placeholder='나만의 스윗을 날려보세요!'
        onChange={onHandleChange}
        value={tweetText}
      ></TextArea>
      <Hashtag
        selectedHashtagArray={hashtags}
        setHashtagsArray={setHashtags}
        hashDefault={hashDefault}
        setHashDefault={setHashDefault}
      />
      <Label htmlFor='file_upload'>{displayFileNames}</Label>
      <File
        id='file_upload'
        type='file'
        accept='image/*'
        multiple
        onChange={onHandleUpload}
      />
      <AddButton onClick={onHandleClick} disabled={buttonAbled ? '' : true}>
        add
      </AddButton>
    </Container>
  );
};

export default Tweet;
