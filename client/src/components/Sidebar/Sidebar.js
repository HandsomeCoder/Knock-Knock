import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Search, Chat, CurrentUser } from "./index.js";

import useStyles from "../../hooks/use-styles";

const styles = {
  root: {
    paddingLeft: 21,
    paddingRight: 21,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 15,
  },
};

const Sidebar = (props) => {
  const classes = useStyles(styles);
  const conversations = useSelector((state) => state.conversations || []);
  const { handleChange, searchTerm } = props;

  return (
    <Box className={classes.root}>
      <CurrentUser />
      <Typography className={classes.title}>Chats</Typography>
      <Search handleChange={handleChange} />
      {conversations
        .filter((conversation) =>
          conversation.otherUser.username.includes(searchTerm)
        )
        .map((conversation) => {
          return (
            <Chat
              conversation={conversation}
              key={conversation.otherUser.username}
            />
          );
        })}
    </Box>
  );
};

export default Sidebar;
