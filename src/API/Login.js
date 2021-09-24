import {
  auth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from '../Firebase/firebase';

function login() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const tempEmail = window.localStorage.getItem('emailForSignIn');
    if (!tempEmail) {
      alert('유효한 이메일이 없습니다. 잠시 후 다시 시도해주세요.');
    }
    signInWithEmailLink(auth, tempEmail, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('emailForSignIn');
      })
      .catch((error) => {
        if (
          error.code !== 'auth/network-request-failed' &&
          error.code !== 'auth/email-already-in-use'
        ) {
          alert('loading for log in...');
        }
      });
    return auth.currentUser ? true : false;
  }
}

export default login;
