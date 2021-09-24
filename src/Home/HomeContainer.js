import React, { useEffect, useState } from 'react';
import database, { PROFILE_DEFAULT_IMG } from '../API/Database';
import { auth, updateProfile } from '../Firebase/firebase';
import HomePresenter from './HomePresenter';

const Home = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const tempUser = localStorage.getItem('userNameForSignUp');
    if (auth.currentUser && tempUser) {
      setUser(auth.currentUser);
      updateProfile(auth.currentUser, {
        displayName: tempUser,
        photoURL: PROFILE_DEFAULT_IMG,
      })
        .then(() => {
          const { uid, email, displayName } = auth.currentUser;
          database.createUser(uid, displayName, email);
        })
        .then(() => {
          localStorage.removeItem('userNameForSignUp');
        })
        .catch((error) => {
          if (error.code !== 'auth/network-request-failed') {
            alert(
              '새 사용자 정보를 업데이트 하지 못했습니다. My Profile에서 사용자 이름을 업데이트 해주세요.'
            );
          }
        });
    }
  }, []);

  return <HomePresenter />;
};

export default Home;
