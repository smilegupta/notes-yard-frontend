import React, { useState, useEffect, Fragment, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Header from './Components/Common/Header';
import HomeScreen from './Components/Screens/HomeScreen/HomeScreen';
import Welcome from './Components/Screens/HomeScreen/Welcome';
import Loader from './Components/Common/Loader';

//lazy loading components 
const Login = React.lazy(() => import('./Components/Screens/Auth/Login'));
const Register = React.lazy(() => import('./Components/Screens/Auth/Register'));
const ForgetPassword = React.lazy(() =>
  import('./Components/Screens/Auth/ForgotPassword')
);
const NewPassWord = React.lazy(() =>
  import('./Components/Screens/Auth/NewPassWord')
);
const ProtectedRoute = React.lazy(() =>
  import('./Components/Common/ProtectedRoute')
);
const ErrorPage = React.lazy(() => import('./Components/Common/ErrorPage'));
const PasteBin = React.lazy(() =>
  import('./Components/Screens/PasteBin/Pastebin')
);

const MdPreviewer = React.lazy(() =>
  import('./Components/Screens/MdViewer/MdViewer')
);
const NotebookPage = React.lazy(() =>
  import('./Components/Screens/NotebookPage/Notebook')
);
const ViewPasteBin = React.lazy(() =>
  import('./Components/Screens/PasteBin/ViewPasteBin')
);

function App({ location }) {
  // State Variables
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [user, setUser] = useState(null);

  // Props for Session Management
  const authProps = {
    isAuthenticated,
    user,
    setUser,
    setAuthenticated,
  };

  useEffect(() => {
    async function sessionChecker() {
      try {
        await Auth.currentSession();
        setAuthenticated(true);
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (err) {
        console.error(err);
      }
      setAuthenticating(false);
    }
    sessionChecker();
  }, []);

  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
        {isAuthenticating === false && (
          <Fragment>
            {!location.pathname.includes('/pastebin/view/') && (
              <Header auth={authProps} />
            )}
            <Switch>
              <Route path="/" component={Welcome} exact />
              <ProtectedRoute
                path="/home"
                component={HomeScreen}
                auth={authProps}
              />
              <ProtectedRoute
                path="/notebook/:id/:name"
                component={NotebookPage}
                auth={authProps}
              />
              <Route
                path="/login"
                render={(props) => <Login {...props} auth={authProps} />}
              />
              <Route
                path="/register"
                render={(props) => <Register {...props} auth={authProps} />}
              />
              <Route
                path="/forgot-password"
                render={(props) => (
                  <ForgetPassword {...props} auth={authProps} />
                )}
                exact
              />
              <Route
                path="/forgot-password/:email"
                render={(props) => (
                  <ForgetPassword {...props} auth={authProps} />
                )}
              />
              <Route
                path="/new-password/:email"
                render={(props) => <NewPassWord {...props} auth={authProps} />}
              />
              <Route path="/md-previewer" component={MdPreviewer} />
              <Route
                path="/pastebin/view/:pasteBinId"
                component={ViewPasteBin}
              />
              <Route path="/pastebin" component={PasteBin} />
              <Route component={ErrorPage} />
            </Switch>
          </Fragment>
        )}
      </Suspense>
    </Fragment>
  );
}

export default withRouter(App);
