import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const SET_PROFILE = "session/setProfile";
const REMOVE_PROFILE = "session/removeProfile";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

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

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data.user));
    return data;
  }

  return response;
};

export const signup = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

export const getProfile = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/dogs?userId=${userId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setProfile(data));
    return data;
  }
  return response;
};

export const createProfile = (dogInfo) => async (dispatch) => {
  const response = await csrfFetch(`/api/dogs`, {
    method: "POST",
    body: JSON.stringify(dogInfo),
  });
  console.log("************* response", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(setProfile(data));
    console.log("************* data", data);
    return data;
  }
  return response;
};

export const editProfile = (dogInfo) => async (dispatch) => {
  const response = await csrfFetch(`/api/dogs`, {
    method: "PUT",
    body: JSON.stringify(dogInfo),
  });
  console.log("************* response", response);
  if (response.ok) {
    const data = await response.json();
    dispatch(setProfile(data));
    console.log("************* data", data);
    return data;
  }
  return response;
};

export const deleteProfile = (dogId) => async (dispatch) => {
  const response = await csrfFetch(`/api/dogs`, {
    method: "DELETE",
    body: JSON.stringify(dogId),
  });
  dispatch(removeProfile());
  return response;
};

const initialState = { user: null, profile: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case SET_PROFILE:
      newState = Object.assign({}, state);
      newState.profile = action.profile;
      return newState;
    case REMOVE_PROFILE:
      newState = Object.assign({}, state);
      newState.profile = null;
      console.log("**************** newState", newState);
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
