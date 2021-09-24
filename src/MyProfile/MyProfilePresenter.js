import React from 'react';
import Navbar from '../Navbar';
import MySweetList from './MySweetList';
import {
  MyProfileContainer,
  SaveButton,
  Input,
  Label,
  ImgChangeButton,
  ImgContainer,
  EditContainer,
  EditProfileForm,
  ContentsCotainer,
  ProfileImg,
  SweetContainer,
  ProfileContentContainer,
  H2,
} from '../Styles/ProfileStyles';
import { File } from '../Styles/TweetStyles';
import { ConfirmSpan } from '../Styles/SignStyles';

const MyProfilePresenter = ({
  email,
  userName,
  profileImg,
  onHandleNameChange,
  onHandleClickSaveButton,
  onHandleChangeImg,
  successUpdate,
}) => {
  return (
    <MyProfileContainer>
      <Navbar />
      <ProfileContentContainer>
        <ContentsCotainer>
          <ImgContainer name='image_container'>
            <ProfileImg name='image' imgUrl={profileImg} />
            <ImgChangeButton htmlFor='profile_img_changer'>
              <i className='fas fa-camera fa-md'></i>
            </ImgChangeButton>
            <File
              id='profile_img_changer'
              type='file'
              accept='image/*'
              onChange={onHandleChangeImg}
            />
          </ImgContainer>
          <EditProfileForm name='edit_profile'>
            <EditContainer>
              <Label htmlFor='profile_email'>이메일(E-mail)</Label>
              <Input
                type='email'
                name='email'
                id='profile_email'
                value={email}
                disabled
                notselected={true}
              />
            </EditContainer>
            <EditContainer>
              <Label htmlFor='profile_name'>이름(Name)</Label>
              <Input
                name='name'
                id='profile_name'
                value={userName}
                onChange={onHandleNameChange}
                notselected={false}
              />
            </EditContainer>
            <SaveButton onClick={onHandleClickSaveButton}>저장</SaveButton>
            {successUpdate && (
              <ConfirmSpan color='#74b9ff'>저장 완료!</ConfirmSpan>
            )}
          </EditProfileForm>
        </ContentsCotainer>
        <SweetContainer>
          <H2>My Sweets</H2>
          <MySweetList />
        </SweetContainer>
      </ProfileContentContainer>
    </MyProfileContainer>
  );
};

export default MyProfilePresenter;
