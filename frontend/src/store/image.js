import { async } from "@firebase/util";
import { csrfFetch } from "./csrf";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const SET_PROFILE_IMAGES = "image/setImages";

const setProfileImages = (images) => {
  return {
    type: SET_PROFILE_IMAGES,
    images,
  };
};

export const addImages = (dogId, imgArr) => async (dispatch) => {
  const promises = [];
  for (let i = 0; i < imgArr.length; i++) {
    const img = imgArr[i];
    const imageRef = ref(storage, `dog-images/${dogId}/${i}`);
    promises.push(
      uploadBytes(imageRef, img).then((res) => getDownloadURL(res.ref))
    );
  }
  const urlArr = await Promise.all(promises);

  const response = await csrfFetch(`/api/dogs/images`, {
    method: "POST",
    body: JSON.stringify({ dogId, urls: urlArr }),
  });

  if (response.ok) {
    const data = await response.json();
    // dispatch(setProfileImages(data));

    return data;
  }
  return response;
};

const initialState = {};

const imageReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_PROFILE_IMAGES:
      newState = Object.assign({}, state);
      action.images.forEach((img) => (newState[img.id] = img));
  }
};

export default imageReducer;
