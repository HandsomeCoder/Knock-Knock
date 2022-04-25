import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/utils/thunkCreators";
import { Home, SnackbarError } from "./components";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

const Routes = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === "string") {
        setErrorMessage(user.error);
      } else {
        setErrorMessage("Internal Server Error. Please try again");
      }
      setSnackBarOpen(true);
    }
  }, [user.error]);

  if (user.isFetchingUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/"
          render={(props) => (props.user?.id ? <Redirect to="/home" /> : <Landing>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Registration} />
              <Route component={Login} />
            </Switch>
          </Landing>)} />

      </Switch>
    </>
  );
};

export default withRouter(Routes);
