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

export const addImage = (userId, img) => async (dispatch) => {
  const imageRef = ref(storage, `dog-images/${userId}/${Date.now()}`);
  uploadBytes(imageRef, img).then(() => {
    console.log("************ img uploaded");
  });
  const images = ref(storage, `dog-images/${userId}/`);
  listAll(images).then((res) =>
    res.items.forEach((item) =>
      getDownloadURL(item).then(
        async (url) =>
          await csrfFetch(`/api/dogs/images`, {
            method: "POST",
            body: JSON.stringify(img),
          })
      )
    )
  );
  const response = await csrfFetch(`/api/dogs/images`, {
    method: "POST",
    body: JSON.stringify(img),
  });
  if (response.ok) {
    const data = await response.json();

    console.log("************* create img data", data);
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
