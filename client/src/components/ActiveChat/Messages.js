import { React, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, latestReadMessageId } = props;

  const messageContainer = useRef(null);
  const isAutoScroll = isScrollNotAtBottom(messageContainer.current);

  const activeConversationId = useSelector(
    (state) => state.activeConversation.id
  );

  function isScrollNotAtBottom(element) {
    return (
      element ?
        element.scrollHeight - Math.round(element.scrollTop) !== element.clientHeight 
        : false
    );
  }

  function scrollToBottom(element, smoothly = false) {
    element.scrollTo({
      top: element.scrollHeight,
      behavior: smoothly ? "smooth" : "auto",
    });
  }

  // Run when open the chat at every first time
  useEffect(() => {
    if (messageContainer.current) {
      scrollToBottom(messageContainer.current);
    }
  }, [activeConversationId]);

  // Run whenever new is posted by loggedIn user or scroll is at the bottom
  useEffect(() => {
    if (!messageContainer.current) {
      return;
    }

    const sentByLoggedInUser =
      messages &&
      messages.length > 0 &&
      messages[messages.length - 1].senderId === userId;

    console.log(isAutoScroll)
    if (isAutoScroll) {
      scrollToBottom(messageContainer.current, true);
    }
  }, [messages, userId, isAutoScroll]);

  return (
    <Box ref={messageContainer} className={props.className}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        const showOtherUserAvatar = latestReadMessageId === message.id;

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            showOtherUserAvatar={showOtherUserAvatar}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
