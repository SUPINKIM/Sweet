import React from 'react';
import { auth, signOut } from './Firebase/firebase';
import {
  NavContainer,
  NavUl,
  NavList,
  Navlink,
  Button,
  Icon,
} from './Styles/NavbarStyles';

const Navbar = () => {
  const onHandleClick = (event) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.location.replace('/');
      })
      .catch((error) => {
        alert(
          '예기치 못한 문제가 발생해 로그아웃에 실패했습니다. 잠시 후 다시 시도하거나 페이지 새로고침을 해주세요.'
        );
      });
  };
  return (
    <NavContainer>
      <Icon className='fab fa-twitter fa-3x' />
      <NavUl>
        <NavList>
          <Navlink to='/'>Home</Navlink>
        </NavList>
        <NavList>
          <Navlink to='/myprofile'>My Profile</Navlink>
        </NavList>
        <NavList>
          <Button name='logout_button' onClick={onHandleClick}>
            로그아웃
          </Button>
        </NavList>
      </NavUl>
    </NavContainer>
  );
};

export default Navbar;
