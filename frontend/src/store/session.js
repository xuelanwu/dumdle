import { csrfFetch } from "./csrf";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

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
  const response = await csrfFetch(`/api/dogs/`, {
    method: "POST",
    body: JSON.stringify(dogInfo),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setProfile(data));
    return data;
  }
  return response;
};

export const editProfile = (dogInfo) => async (dispatch) => {
  const response = await csrfFetch(`/api/dogs/`, {
    method: "PUT",
    body: JSON.stringify(dogInfo),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setProfile(data));
    return data;
  }
  return response;
};

export const deleteProfile = (dogId) => async (dispatch) => {
  const response = await csrfFetch(`/api/dogs/`, {
    method: "DELETE",
    body: JSON.stringify(dogId),
  });
  dispatch(removeProfile());
  return response;
};

export const addImages = (dogId, imgArr) => async (dispatch) => {
  const urlArr = [];
  const promise = [];
  for (let i = 0; i < imgArr.length; i++) {
    if (typeof imgArr[i] !== "string") {
      const img = imgArr[i];
      const imageRef = ref(storage, `dog-images/${dogId}/${Math.random()}`);

      promise.push(
        uploadBytes(imageRef, img).then((res) => getDownloadURL(res.ref))
      );
    } else urlArr.push(imgArr[i]);
  }

  const resArr = await Promise.all(promise);

  const urls = [...urlArr, ...resArr];

  const response = await csrfFetch(`/api/dogs/images`, {
    method: "POST",
    body: JSON.stringify({ dogId, urls }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getProfile(dogId));
    return data;
  }
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
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
