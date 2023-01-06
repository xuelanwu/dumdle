import { async } from "@firebase/util";
import { csrfFetch } from "./csrf";

const SET_DOG = "friend/setDog";
const SET_MATCHES = "friend/setMatches";
const SET_FRIENDSHIP = "friend/setFriendship";

const setDog = (dog) => {
  return {
    type: SET_DOG,
    dog,
  };
};

const setFriendship = (friendship) => {
  return {
    type: SET_FRIENDSHIP,
    friendship,
  };
};

const setMatches = (matches) => {
  return {
    type: SET_MATCHES,
    matches,
  };
};

export const getDog = (dogId) => async (dispatch) => {
  const response = await csrfFetch(`/api/friends?dogId=${dogId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setDog(data));
    if (data) {
      console.log("********* dataId", dogId);
      console.log("********* data.id", data.id);
      const res = await csrfFetch(`/api/friends`, {
        method: "POST",
        body: JSON.stringify({ dogId_1: dogId, dogId_2: data.id }),
      });
      console.log("***************** friend post");
      if (res.ok) {
        const result = await res.json();
        console.log("************* reducer new dog", result);
        dispatch(setFriendship(result));
        return result;
      }
    }
    return data;
  }
  return response;
};

export const likeFriend = (friendId) => async (dispatch) => {
  const response = await csrfFetch(`/api/friends/like`, {
    method: "PUT",
    body: JSON.stringify({ friendId }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("************** like reducer", data);
    dispatch(setFriendship(data));
    return data;
  }
  return response;
};

export const blockFriend = (friendId) => async (dispatch) => {
  console.log("*********** friendId", friendId);

  const response = await csrfFetch(`/api/friends/block`, {
    method: "PUT",
    body: JSON.stringify({ friendId }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("************** block reducer", data);
    dispatch(setFriendship(data));
    return data;
  }
  return response;
};

export const getMatches = (dogId) => async (dispatch) => {
  const response = await csrfFetch(`api/friends/matches?dogId=${dogId}`);

  if (response.ok) {
    const data = await response.json();

    dispatch(setMatches(data));
    return data;
  }
  return response;
};

const initialState = {
  dog: null,
  friendship: null,
  matched: null,
  pending: null,
};

const friendReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_DOG:
      newState = Object.assign({}, state);
      newState.dog = action.dog;
      return newState;
    case SET_FRIENDSHIP:
      newState = Object.assign({}, state);
      newState.friendship = action.friendship;
      return newState;
    case SET_MATCHES:
      newState = Object.assign({}, state);
      newState.matched = {};
      action.matches.forEach((match) => {
        newState.matched[match.id] = match;
      });
      return newState;

    default:
      return state;
  }
};

export default friendReducer;
