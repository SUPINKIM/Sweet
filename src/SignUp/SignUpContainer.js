import React, { useState } from 'react';
import SignUpPresenter from './SignUpPresenter';
import {
  auth,
  sendSignInLinkToEmail,
  actionCodeSettings,
} from '../Firebase/firebase';
import database from '../API/Database';

export const createUserAuth = async (
  userEmail,
  callbackFn,
  userName = null
) => {
  try {
    sendSignInLinkToEmail(auth, userEmail, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', userEmail);
    if (userName) {
      window.localStorage.setItem('userNameForSignUp', userName);
    }
    callbackFn(true);
  } catch (error) {
    alert('이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
  }
};

export const checkExistingUser = (userEmail) => {
  const { fetchData } = database;
  const result = fetchData('users');

  let check = false;

  const bool = result
    .then((snapshot) => {
      const { error, data } = snapshot;
      if (error) {
        alert(
          '유저 정보를 확인하는 데 실패했습니다. 잠시 후 다시 시도해주세요.'
        );
      } else {
        data.forEach((item) => {
          if (item.email === userEmail) {
            check = true;
          }
        });
      }
    })
    .then(() => check);

  return bool;
};

const SignUpContainer = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [existing, setExisting] = useState(false);
  const [sendMail, setSendMail] = useState(false);

  const onHandleChange = (event) => {
    const {
      target: { value, name },
    } = event;

    switch (name) {
      case 'name':
        setUserName(value);
        break;
      case 'email':
        setUserEmail(value);
        break;
      default:
        break;
    }
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();

    checkExistingUser(userEmail)
      .then((value) => {
        if (value) {
          setExisting(true);
        } else {
          createUserAuth(userEmail, setSendMail, userName);
          setUserName('');
          setUserEmail('');
        }
      })
      .catch((error) =>
        alert('예기치 못한 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
      );
  };

  return (
    <SignUpPresenter
      user={userName}
      email={userEmail}
      onHandleChange={onHandleChange}
      onHandleSubmit={onHandleSubmit}
      existing={existing}
      setExisting={setExisting}
      sendMail={sendMail}
    />
  );
};
export default SignUpContainer;
