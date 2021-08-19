import {
  getOtherUserLastMessageReadId,
  getUnreadMessageCount,
} from "./conversationUtils";


export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    newConvo.latestMessageAt = message.updatedAt;
    newConvo.latestReadMessageId = getOtherUserLastMessageReadId(
      newConvo.messages,
      newConvo.otherUser.id
    );
    newConvo.unreadMessagesCount = getUnreadMessageCount(
      newConvo.messages,
      newConvo.otherUser.id
    );
    return [newConvo, ...state];
  }

  return state
    .map((convo) => {
      if (convo.id === message.conversationId) {
        const convoCopy = { ...convo };
        convoCopy.messages.push(message);
        convoCopy.latestMessageText = message.text;
        convoCopy.latestMessageAt = message.updatedAt;
        convoCopy.latestReadMessageId = getOtherUserLastMessageReadId(
          convoCopy.messages,
          convoCopy.otherUser.id
        );
        convoCopy.unreadMessagesCount = getUnreadMessageCount(
          convoCopy.messages,
          convoCopy.otherUser.id
        );

        return convoCopy;
      } else {
        return convo;
      }
    })
    .sort((a, b) => new Date(b.latestMessageAt) - new Date(a.latestMessageAt));
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};

export const updateConversationMessageStatus = (state, conversationId, userId) => {
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const newConvo = { ...convo };
      newConvo.messages = newConvo.messages.map((msg) => {
        if (msg.senderId === userId) {
          msg.readStatus = true;
        }
        return msg;
      });

      newConvo.latestReadMessageId = getOtherUserLastMessageReadId(
        newConvo.messages,
        newConvo.otherUser.id
      );
      newConvo.unreadMessagesCount = getUnreadMessageCount(
        newConvo.messages,
        newConvo.otherUser.id
      );

      return newConvo;
    } else {
      return convo;
    }
  });
};