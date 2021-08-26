import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { postMessage as sendMessage } from "../../store/utils/thunkCreators";

import useStyles from "../../hooks/use-styles";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
};

const Input = (props) => {
  const classes = useStyles(styles);
  const { otherUser, conversationId } = props;

  const [text, setText] = useState("");

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const postMessage = (message) => {
    dispatch(sendMessage(message));
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text.length === 0 || text.trim().length === 0) {
      return;
    }

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
    };
    postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

export default Input;
