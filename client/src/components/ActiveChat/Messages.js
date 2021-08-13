import { React, useRef, useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const messageConainer = useRef(null);

  useEffect(() => {
    if(messageConainer.current && messages[messages.length - 1].senderId === userId) {
      messageConainer.current.scrollTop = messageConainer.current.scrollHeight
    }
  }, [messages.length]);

  return (
    <Box ref={messageConainer} className={props.className}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
