import React from "react";
import { Box, Typography, Avatar } from "@material-ui/core";

import useStyles from "../../hooks/use-styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: "15px",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  avatar: {
    height: 20,
    width: 20,
    marginTop: "5px",
  },
};

const SenderBubble = (props) => {
  const classes = useStyles(styles);
  const { time, text, showOtherUserAvatar, otherUser } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {showOtherUserAvatar && (
        <Avatar
          alt={otherUser.username}
          src={otherUser.photoUrl}
          className={classes.avatar}
        ></Avatar>
      )}
    </Box>
  );
};

export default SenderBubble;
