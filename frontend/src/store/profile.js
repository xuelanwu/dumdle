import { csrfFetch } from "./csrf";

const SET_PROFILE = "profile/getProfile";
const REMOVE_PROFILE = "profile/removeProfile";

const setProfile = (profile) => {
  return {
    type: SET_PROFILE,
    profile,
  };
};

const removeProfile = () => {
  return {
    type: REMOVE_PROFILE,
  };
};

export const getProfile = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/dog`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setProfile(data));
    return data;
  }
  return response;
};

const profileReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case SET_PROFILE:
      newState = Object.assign({}, state);
      newState = action.profile;
      return newState;
    case REMOVE_PROFILE:
      newState = Object.assign({}, state);
      newState.profile = null;
      return newState;
    default:
      return state;
  }
};

export default profileReducer;
