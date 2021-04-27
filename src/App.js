import { useState, useEffect, Fragment } from "react";
import Header from "./Components/Common/Header";
import HomeScreen from "./Components/Screens/HomeScreen/HomeScreen";
import Welcome from "./Components/Screens/HomeScreen/Welcome";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./Components/Screens/Auth/Login";
import Register from "./Components/Screens/Auth/Register";
import ForgetPassword from "./Components/Screens/Auth/ForgotPassword";
import NewPassWord from "./Components/Screens/Auth/NewPassWord";
import { Auth } from "aws-amplify";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import ErrorPage from "./Components/Common/ErrorPage";
import PasteBin from "./Components/Screens/PasteBin/Pastebin";
import MdPreviewer from "./Components/Screens/MdViewer/MdViewer";
import NotebookPage from "./Components/Screens/NotebookPage/Notebook";
import ViewPasteBin from "./Components/Screens/PasteBin/ViewPasteBin";

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
      {isAuthenticating === false && (
        <Fragment>
          {!location.pathname.includes("/pastebin/view/") && (
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
              render={(props) => <ForgetPassword {...props} auth={authProps} />}
              exact
            />
            <Route
              path="/forgot-password/:email"
              render={(props) => <ForgetPassword {...props} auth={authProps} />}
            />
            <Route
              path="/new-password/:email"
              render={(props) => <NewPassWord {...props} auth={authProps} />}
            />
            <Route path="/md-previewer" component={MdPreviewer} />
            <Route path="/pastebin/view/:pasteBinId" component={ViewPasteBin} />
            <Route path="/pastebin" component={PasteBin} />
            <Route component={ErrorPage} />
          </Switch>
        </Fragment>
      )}
    </Fragment>
  );
}

export default withRouter(App);
