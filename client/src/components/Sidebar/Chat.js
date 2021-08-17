import React, { Component } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { withStyles } from "@material-ui/core/styles";
import { setActiveChat, setActiveConversationId } from "../../store/activeConversation";
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
    fontSize: "12px"
  }
};

class Chat extends Component {

  constructor() {
		super();
		this.unreadMessagesCount = 0;
	}

	createRequestForUpdateState(userId, recipientId, conversationId){
		return { userId, recipientId, conversationId }
	}

  handleClick = async (conversation) => {
	  const { user, setActiveChat, setActiveId, updateReadStatus } = this.props;

    await setActiveChat(conversation.otherUser.username);
    await setActiveId(conversation.id);
    
    if(this.unreadMessagesCount > 0){ 
        updateReadStatus(this.createRequestForUpdateState(user.id, 
                            conversation.otherUser.id, conversation.id));
    }
  };

  componentDidUpdate(){
    const { user, conversation, activeConversationId, updateReadStatus } = this.props;

		if(this.unreadMessagesCount  > 0 && conversation.id === activeConversationId){
			updateReadStatus(this.createRequestForUpdateState(user.id, 
                            conversation.otherUser.id, conversation.id));
		}
  }

	getUnreadMessageCount(conversationId, messages){
		this.unreadMessagesCount = messages.filter(msg => msg.senderId !== this.props.user.id)
																.reduce((acc, curr) => curr.readStatus ? acc : acc + 1, 0);

		return (this.props.activeConversationId === conversationId) ? 0 : this.unreadMessagesCount;
	}

  render() {
    const { classes, conversation } = this.props;
    const otherUser = conversation.otherUser;
		
		const displayUnreadMessageCount = this.getUnreadMessageCount(conversation.id, 
																						conversation.messages);

    return (
      <Box
        onClick={() => this.handleClick(this.props.conversation)}
        className={classes.root}>
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        {displayUnreadMessageCount > 0 && 
            <div className={classes.unreadMessages}>{displayUnreadMessageCount}</div>}
      </Box>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (username) => {
      dispatch(setActiveChat(username));
    },
    setActiveId: (id) => {
      dispatch(setActiveConversationId(id));
    },
    updateReadStatus: (id, userId) => {
        dispatch(updateConversationMessageReadStatus(id, userId));
    }
  };
};

const mapStateToProps = (state) => {
    return {
      user: state.user,
      activeConversationName: state.activeConversation.username,
      activeConversationId: state.activeConversation.id
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
