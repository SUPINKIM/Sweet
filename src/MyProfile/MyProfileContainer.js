import React, { useState } from 'react';
import Storage from '../API/Storage';
import { auth, updateProfile } from '../Firebase/firebase';
import MyProfilePresenter from './MyProfilePresenter';
import database from '../API/Database';

const MyProfileContainer = () => {
  const { email, displayName, photoURL } = auth.currentUser;

  const [userName, setUserName] = useState(displayName);
  const [profileImg, setProfileImg] = useState(photoURL);
  const [selectedFile, setSelectedFile] = useState('');
  const [successUpdate, setSuccessUpdate] = useState(false);

  const onHandleNameChange = (event) => {
    setUserName(event.target.value);
    setSuccessUpdate(false);
  };

  const updateUserProfile = (newInfo) => {
    updateProfile(auth.currentUser, newInfo)
      .then(() => {
        database.updateUserInfo(newInfo);
      })
      .then(() => {
        setSuccessUpdate(true);
      });
  };

  const onHandleClickSaveButton = () => {
    const newInfo = {};
    let flag = false;
    if (displayName !== userName) {
      newInfo['displayName'] = userName;
      flag = true;
    }
    if (photoURL !== profileImg) {
      Storage.uploadImages(selectedFile)
        .then(({ success }) => {
          if (success) {
            Storage.downloadImagesUrl(selectedFile)
              .then(({ response, success }) => {
                if (success) {
                  newInfo['photoURL'] = response;
                } else {
                  new Error();
                }
              })
              .then(() => {
                updateUserProfile(newInfo);
              });
          }
        })
        .catch((error) =>
          alert('프로필 이미지를 업데이트 하는 데 문제가 발생했습니다.')
        );
    } else if (flag) {
      updateUserProfile(newInfo);
    }
  };

  const onHandleChangeImg = (event) => {
    setSuccessUpdate(false);
    const { files } = event.target;

    if (files && files[0]) {
      const objectURL = URL.createObjectURL(files[0]);
      setProfileImg(objectURL);
      setSelectedFile(files[0]);
    }
  };

  return (
    <MyProfilePresenter
      email={email}
      userName={userName}
      profileImg={profileImg}
      onHandleNameChange={onHandleNameChange}
      onHandleClickSaveButton={onHandleClickSaveButton}
      onHandleChangeImg={onHandleChangeImg}
      successUpdate={successUpdate}
    />
  );
};

export default MyProfileContainer;
