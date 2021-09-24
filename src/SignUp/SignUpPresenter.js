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

const SignUpPresenter = ({
  user,
  email,
  onHandleChange,
  onHandleSubmit,
  existing,
  setExisting,
  sendMail,
}) => {
  return (
    <FormContainer>
      <Welcome sign='회원가입' />
      <Form onSubmit={onHandleSubmit}>
        <Label id='name'>사용자 이름</Label>
        <Input
          name='name'
          type='text'
          placeholder='홍길동'
          value={user}
          onChange={onHandleChange}
          onFocus={() => setExisting(false)}
          required
        />
        <Label id='email'>이메일</Label>
        <Input
          name='email'
          type='email'
          placeholder='sweet@gmail.com'
          value={email}
          onChange={onHandleChange}
          onFocus={() => setExisting(false)}
          required
        />
        <InputSubmit type='submit' name='signin_button' value='회원가입' />
        {existing && (
          <ConfirmSpan color='#d63031'>
            이미 사용 중인 이메일입니다. 다른 이메일로 가입해주세요.
          </ConfirmSpan>
        )}
        {sendMail && (
          <ConfirmSpan color='#74b9ff'>
            메일 발신 완료! 메일함을 확인해주세요.
          </ConfirmSpan>
        )}
      </Form>
      <Span>이미 계정이 있으시다고요?</Span>
      <Button name='signin_button'>
        <Navlink to='/signin'>로그인</Navlink>
      </Button>
    </FormContainer>
  );
};

export default SignUpPresenter;
