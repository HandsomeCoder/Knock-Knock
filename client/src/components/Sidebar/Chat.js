import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import {
  setActiveChat,
  setActiveConversationId,
} from "../../store/activeConversation";
import { updateConversationMessageReadStatus } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

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

class Chat extends Component {
  handleClick = async (conversation) => {
    const {
      user,
      setActiveChat,
      setActiveConversationId,
      updateConversationMessageReadStatus,
    } = this.props;

    await setActiveChat(conversation.otherUser.username);
    await setActiveConversationId(conversation.id);

    if (conversation.unreadMessagesCount > 0) {
      updateConversationMessageReadStatus({
        userId: user.id,
        conversationId: conversation.id,
        recipientId: conversation.otherUser.id,
      });
    }
  };

  render() {
    const { classes, conversation, activeConversationId } = this.props;
    const otherUser = conversation.otherUser;

    const displayUnreadMessageCount =
      activeConversationId === conversation.id
        ? 0
        : conversation.unreadMessagesCount;

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        {displayUnreadMessageCount > 0 && (
          <div className={classes.unreadMessages}>
            {displayUnreadMessageCount}
          </div>
        )}
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (username) => {
      dispatch(setActiveChat(username));
    },
    setActiveConversationId: (id) => {
      dispatch(setActiveConversationId(id));
    },
    updateConversationMessageReadStatus: (body) => {
      dispatch(updateConversationMessageReadStatus(body));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeConversationName: state.activeConversation.username,
    activeConversationId: state.activeConversation.id,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
