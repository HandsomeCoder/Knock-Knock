import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateMessageStatus,
} from "./store/conversations";

import { updateConversationMessageReadStatus } from "./store/utils/thunkCreators";

const socket = io(process.env.REACT_APP_SERVER_BASE_URL, {
  reconnection: false,
  autoConnect: false,
  auth: (cb) => {
    cb({ token: localStorage.getItem("messenger-token") });
  },
});

export const openSocket = () => {
  socket.connect();
  sendEvent("go-online");
};

export const sendEvent = async (name, data) => {
  socket.emit(name, data);
};

socket.on("add-online-user", (id) => {
  store.dispatch(addOnlineUser(id));
});

socket.on("remove-offline-user", (id) => {
  store.dispatch(removeOfflineUser(id));
});

socket.on("new-message", (data) => {
  const { message, sender } = data;
  const appState = store.getState();

  store.dispatch(setNewMessage(message, sender));

  if (message.conversationId === appState.activeConversation.id) {
    store.dispatch(
      updateConversationMessageReadStatus({
        conversationId: message.conversationId,
        userId: appState.user.id,
        recipientId: message.senderId,
      })
    );
  }
});

socket.on("message-read", (data) => {
  store.dispatch(updateMessageStatus(data.conversationId, data.readByUserId));
});

export default socket;
