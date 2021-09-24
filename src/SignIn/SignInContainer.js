import React, { useState } from 'react';
import SignInPresenter from './SignInPresenter';
import { checkExistingUser, createUserAuth } from '../SignUp/SignUpContainer';

const SignInContainer = () => {
  const [userEmail, setUserEmail] = useState('');
  const [existingUser, setExisting] = useState(true);
  const [sendMail, setSendMail] = useState(false);

  const onHandleSubmit = (event) => {
    event.preventDefault();
    const check = checkExistingUser(userEmail);
    check
      .then((value) => {
        if (value) {
          createUserAuth(userEmail, setSendMail);
        } else {
          setExisting(false);
        }
      })
      .catch((error) => {
        alert('현재 로그인이 어렵습니다. 잠시 후 다시 시도해주세요.');
      });
  };

  const onHandleChange = (event) => {
    setUserEmail(event.target.value);
  };

  return (
    <SignInPresenter
      userEmail={userEmail}
      onHandleChange={onHandleChange}
      onHandleSubmit={onHandleSubmit}
      existingUser={existingUser}
      setExisting={setExisting}
      sendMail={sendMail}
    />
  );
};

export default SignInContainer;
