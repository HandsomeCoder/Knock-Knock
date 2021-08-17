const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
const SET_ACTIVE_CONVERSATION_ID = "SET_ACTIVE_CONVERSATION_ID";

export const setActiveChat = (username) => {
  return {
    type: SET_ACTIVE_CHAT,
    username
  };
};

export const setActiveConversationId = (id) => {
    return {
      type: SET_ACTIVE_CONVERSATION_ID,
      id
    };
};

const initState = { 
    username: "", 
    id: -1 
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
        return { 
            ...state,
            username: action.username,
        }
      
    }
    case SET_ACTIVE_CONVERSATION_ID: {
        return { 
            ...state,
            id: action.id
        }
    }
    default:
      return state;
  }
};

export default reducer;
