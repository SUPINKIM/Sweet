import React from 'react';
import { Redirect, Route } from 'react-router';
import login from './API/Login';
import Loading from './Pages/Loading';

const PublicRouter = ({ component: Component, user, loading, ...rest }) => {
  return loading ? (
    <Loading />
  ) : !user && !login() ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to='/' />
  );
};

export default PublicRouter;
