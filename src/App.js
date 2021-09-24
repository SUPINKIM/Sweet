import React, { useEffect, useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Home/HomeContainer';
import MyProfile from './MyProfile/MyProfileContainer';
import SignIn from './SignIn/SignInContainer';
import SignUp from './SignUp/SignUpContainer';
import NotFound from './Pages/NotFound';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import { auth, onAuthStateChanged } from './Firebase/firebase';
import GlobalStyle from './Styles/GlobalStyles';

const App = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(true);
      }
      setLoading(false);
    });
  }, []);

  return (
    <HashRouter>
      <GlobalStyle />
      <Switch>
        <PrivateRouter
          user={currentUser}
          component={Home}
          path='/'
          loading={loading}
          exact
        />
        <PrivateRouter
          user={currentUser}
          component={MyProfile}
          path='/myprofile'
          loading={loading}
          exact
        />
        <PublicRouter
          user={currentUser}
          component={SignIn}
          path='/signin'
          loading={loading}
          exact
        />
        <PublicRouter
          user={currentUser}
          component={SignUp}
          path='/signup'
          loading={loading}
          exact
        />
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  );
};

export default App;
