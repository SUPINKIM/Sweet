import React from 'react';
import { Navlink } from '../Styles/NavbarStyles';
import {
  Button,
  ConfirmSpan,
  Form,
  FormContainer,
  Input,
  InputSubmit,
  Label,
  Span,
} from '../Styles/SignStyles';
import Welcome from '../Welcome';

const SignInPresenter = ({
  userEmail,
  onHandleChange,
  onHandleSubmit,
  existingUser,
  setExisting,
  sendMail,
}) => {
  return (
    <FormContainer>
      <Welcome sign='로그인' />
      <Form onSubmit={onHandleSubmit}>
        <Label id='email'>이메일(E-mail)</Label>
        <Input
          name='email'
          type='email'
          placeholder='sweet@gmail.com'
          value={userEmail}
          onChange={onHandleChange}
          required
          autoFocus
          onFocus={() => setExisting(true)}
        />
        <InputSubmit type='submit' name='signin_button' value='로그인' />
        {!existingUser && (
          <ConfirmSpan color='#d63031'>
            가입되지 않은 계정입니다. 회원가입을 먼저 진행해 주세요.
          </ConfirmSpan>
        )}
        {sendMail && (
          <ConfirmSpan color='#74b9ff'>
            메일 발신 완료! 메일함을 확인해주세요.
          </ConfirmSpan>
        )}
      </Form>
      <Span>아직 계정이 없으시다고요?</Span>
      <Button name='signup_button'>
        <Navlink to='/signup'>회원가입</Navlink>
      </Button>
    </FormContainer>
  );
};

export default SignInPresenter;
