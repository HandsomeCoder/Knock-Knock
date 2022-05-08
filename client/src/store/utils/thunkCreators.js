import { openSocket, sendEvent } from "../../socket";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  updateMessageStatus,
} from "../conversations";

import {
  getOtherUserLastMessageReadId,
  getUnreadMessageCount,
} from "./conversationUtils";

import { setActiveConversationId } from "../activeConversation";

import { gotUser, setFetchingStatus } from "../user";
import httpClient from "./interceptor";

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await httpClient.get("/auth/user");
    dispatch(gotUser(data));
    if (data.id) {
      openSocket();
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await httpClient.post("/auth/register", credentials);
    await localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    openSocket();
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await httpClient.post("/auth/login", credentials);
    localStorage.setItem("messenger-token", data.token);
    dispatch(gotUser(data));
    openSocket();
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await httpClient.delete("/auth/logout");
    await localStorage.removeItem("messenger-token");
    dispatch(gotUser({}));
    sendEvent("logout");
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get("/api/conversations");

    for (const conversation of data) {
      conversation.latestReadMessageId = getOtherUserLastMessageReadId(
        conversation.messages,
        conversation.otherUser.id
      );

      conversation.unreadMessagesCount = getUnreadMessageCount(
        conversation.messages,
        conversation.otherUser.id
      );
    }

    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await httpClient.post("/api/messages", body);
  return data;
};

const sendMessage = (data, body) => {
  sendEvent("new-message", {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
  });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    const data = await saveMessage(body);

    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
      dispatch(setActiveConversationId(data.message.conversationId));
    } else {
      dispatch(setNewMessage(data.message));
    }

    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

const updateMessageReadStatus = async (body) => {
  const { data } = await httpClient.put("/api/messages/status/read", body);
  return data;
};

export const updateConversationMessageReadStatus =
  (body) => async (dispatch) => {
    try {
      if (!body.conversationId) {
        return;
      }

      const result = await updateMessageReadStatus(body);

      if (result.status) {
        dispatch(updateMessageStatus(body.conversationId, body.userId));
      }

      sendMessageRead(body.conversationId, body.userId, body.recipientId);
    } catch (error) {
      console.error(error);
    }
  };

const sendMessageRead = (conversationId, readByUserId, recipientId) => {
  sendEvent("message-read", { conversationId, readByUserId, recipientId });
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await httpClient.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};
