import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid, CssBaseline } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import {
  fetchConversations,
} from "../store/utils/thunkCreators";

import useStyles from "../hooks/use-styles";

const styles = {
  root: {
    height: "100vh",
  },
};

const Home = () => {
  const classes = useStyles(styles);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoggedIn(true);
  }, [user.id]);

  useEffect(() => {
    dispatch(fetchConversations());
  });


  if (!user.isFetching && !user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }
  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
};

export default Home;
