import { async } from "@firebase/util";
import { csrfFetch } from "./csrf";

const SET_DOG = "friend/setDog";
const SET_MATCHES = "friend/setMatches";

const setDog = (dog) => {
  return {
    type: SET_DOG,
    dog,
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
      const res = await csrfFetch(`/api/friends`, {
        method: "POST",
        body: JSON.stringify({ dogId_1: dogId, dogId_2: data.id }),
      });
      if (res.ok) {
        const result = await res.json();

        return result;
      }
    }

    return data;
  }
  return response;
};

export const likeFriend = (dogId_1, dogId_2) => async (dispatch) => {
  const response = await csrfFetch(`/api/friends/like`, {
    method: "PUT",
    body: JSON.stringify({ dogId_1, dogId_2 }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getDog(dogId_1));

    return data;
  }
  return response;
};

export const blockFriend = (dogId_1, dogId_2) => async (dispatch) => {
  const response = await csrfFetch(`/api/friends/block`, {
    method: "PUT",
    body: JSON.stringify({ dogId_1, dogId_2 }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(getDog(dogId_1));

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

const initialState = { dog: null, matched: null, pending: null };

const friendReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_DOG:
      newState = Object.assign({}, state);
      newState.dog = action.dog;
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
