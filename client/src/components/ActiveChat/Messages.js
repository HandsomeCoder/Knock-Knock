import { React, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const messageConainer = useRef(null);
  const isAutoScroll = isScrollAtBottom(messageConainer.current);

  let showOtherUserAvatarOnMessageId = getOtherUserLastMessageReadId(messages);

  const activeConversationId = useSelector((state) => state.activeConversation.id);

  function isScrollAtBottom(element){
    return element && element.scrollHeight - Math.abs(element.scrollTop) === element.clientHeight
  }

  function getOtherUserLastMessageReadId(messages){
    if(!messages){
      return -1;
    } 

    for(let i = messages.length - 1; i >= 0; i--){
      let msg = messages[i];
      if(msg.senderId === userId && msg.readStatus){
        return msg.id;
      }
    }

    return -1;
  }

  function scrollToBottom(element, smoothly = false){
    element.scrollTo({top: element.scrollHeight, behavior: smoothly ? 'smooth': 'auto' })
  }

  // Run when open the chat at every first time
  useEffect(() => {
    if(messageConainer.current){
      scrollToBottom(messageConainer.current)
    }
  }, [activeConversationId])

  // Run whenever new is posted by loggedIn user or scroll is at the bottom
  useEffect(() => {
    if(!messageConainer.current) {
      return;
    }

    const sentByLoggedInUser = (messages[messages.length - 1].senderId === userId)

    if(isAutoScroll || sentByLoggedInUser){
      scrollToBottom(messageConainer.current, true)
    }
  }, [messages.length, messages, userId, isAutoScroll]);



  return (
    <Box ref={messageConainer} className={props.className}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        const showOtherUserAvatar = showOtherUserAvatarOnMessageId === message.id;

        return message.senderId === userId ? (
            <SenderBubble key={message.id} text={message.text} 
                          time={time} otherUser={otherUser} 
                          showOtherUserAvatar={showOtherUserAvatar}/>
         ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
