import React from "react";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { useSelector } from "react-redux";

import useStyles from "../../hooks/use-styles";

const style = {
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
    maxHeight: "100vh",
    overflow: "auto",
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    maxHeight: "87vh",
    overflow: "auto",
  },
  chatContent: {
    maxHeight: "73vh",
    overflow: "auto",
  },
};

const ActiveChat = () => {
  const classes = useStyles(style);
  const user = useSelector((state) => state.user);
  const conversation = useSelector(
    (state) =>
      (state.conversations &&
        state.conversations.find(
          (conversation) =>
            conversation.otherUser.username ===
            state.activeConversation.username
        )) ||
      {}
  );

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              className={classes.chatContent}
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              latestReadMessageId={conversation.latestReadMessageId}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ActiveChat;
