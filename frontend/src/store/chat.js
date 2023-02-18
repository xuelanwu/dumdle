import { async } from "@firebase/util";
import { csrfFetch } from "./csrf";

const SET_CHAT = "chat/setChat";
const SET_FRIEND = "chat/setFriend";
const ADD_MESSAGE = "chat/addMessage";

const setChat = (chats) => {
  return {
    type: SET_CHAT,
    chats,
  };
};

const setFriend = (friendship) => {
  return {
    type: SET_FRIEND,
    friendship,
  };
};

const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message,
  };
};

export const getChats = (friendId) => async (dispatch) => {
  const response = await csrfFetch(`/api/DMs?friendId=${friendId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setChat(data));
    return data;
  }
  return response;
};

export const getFriend = (friendId) => async (dispatch) => {
  const response = await csrfFetch(`/api/friends?friendId=${friendId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setFriend(data));
    return data;
  }
  return response;
};

export const sendMessage =
  (friendId, senderId, message) => async (dispatch) => {
    const response = await csrfFetch(`/api/DMs`, {
      method: "POST",
      body: JSON.stringify({ friendId, senderId, message }),
    });
    if (response.ok) {
      const data = await response.json();
      const { id, friendId, senderId, message, createdAt } = data;
      dispatch(addMessage({ id, friendId, senderId, message, createdAt }));
      return data;
    }
    return response;
  };

const initialState = {
  chats: null,
  friend: null,
};

const chatReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_CHAT:
      newState = Object.assign({}, state);
      newState.chats = {};
      if (action.chats) {
        action.chats.forEach((msg) => {
          newState.chats[msg.id] = msg;
        });
      } else {
        newState.chats = action.chats;
      }
      return newState;
    case SET_FRIEND:
      newState = Object.assign({}, state);
      newState.friend = action.friendship;
      return newState;
    case ADD_MESSAGE:
      newState = { ...state, chats: { ...state.chats } };
      newState.chats[action.message.id] = action.message;
      return newState;
    default:
      return state;
  }
};

export default chatReducer;
