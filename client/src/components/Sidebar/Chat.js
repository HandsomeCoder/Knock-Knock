import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import {
  setActiveChat,
  setActiveConversationId,
} from "../../store/activeConversation";
import { updateConversationMessageReadStatus } from "../../store/utils/thunkCreators";

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  unreadMessages: {
    border: "1px",
    display: "inline-block",
    background: "#3A8DFF",
    padding: "1px 7px",
    borderRadius: "10px",
    color: "white",
    marginRight: "15px",
    fontWeight: "bold",
    fontSize: "12px",
  },
};

const Chat = (props) => {
  const { classes, conversation } = props;

  const user = useSelector((state) => state.user);

  const activeConversationId = useSelector(
    (state) => state.activeConversation.id
  );

  const { otherUser } = conversation;

  const displayUnreadMessageCount =
    activeConversationId === conversation.id
      ? 0
      : conversation.unreadMessagesCount;

  const dispatch = useDispatch();

  const handleClick = (conversation) => {
    dispatch(setActiveChat(conversation.otherUser.username));
    dispatch(setActiveConversationId(conversation.id));

    if (conversation.unreadMessagesCount > 0) {
      dispatch(updateConversationMessageReadStatus({
        userId: user.id,
        conversationId: conversation.id,
        recipientId: conversation.otherUser.id,
      }));
    }
  };

  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} />
      {displayUnreadMessageCount > 0 && (
        <div className={classes.unreadMessages}>
          {displayUnreadMessageCount}
        </div>
      )}
    </Box>
  );
};

export default withStyles(styles)(Chat);
