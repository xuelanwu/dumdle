import "./index.css";
import { useEffect, useState } from "react";
import { storage } from "../../../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { addImage } from "../../../../store/image";

const ProfileImageContaienr = ({ user }) => {
  const dispatch = useDispatch();
  const [imagesArr, setImagesArr] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const img = e.dataTransfer.files[0];
      // dispatch(addImage(user.id, img))
      const imgArr = [...imagesArr, img];
      setImagesArr(imgArr);
    }
  };

  // useEffect(() => {
  //   const images = ref(storage, `dog-images/${user.id}/`);
  //   listAll(images).then((res) =>
  //     res.items.forEach((item) =>
  //       getDownloadURL(item).then((url) =>
  //         setImagesArr((prev) => [...prev, url])
  //       )
  //     )
  //   );
  // }, [user]);

  return (
    <div
      className="profile-image-container profile-form-block"
      onDrop={handleDrop}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
    >
      <input
        type="file"
        id="upload-images"
        className="profile-upload"
        multiple={true}
        accept="image/jpeg, image/jpg, image/png"
      ></input>
      <label htmlFor="upload-images" className="upload-image-label">
        <div className="upload-image-grid-container">
          {[...Array(3).keys()].map((n) => (
            <div className="profile-img-grid-item">
              {imagesArr.length > n ? (
                <img
                  className="profile-img"
                  src={URL.createObjectURL(imagesArr[n])}
                ></img>
              ) : (
                <i className="fa-solid fa-plus fa-2xl"></i>
              )}
            </div>
          ))}

          {/* <div className="upload-image-grid-right-top upload-image-grid-item">
            <i className="fa-solid fa-plus fa-2xl"></i>
          </div>
          <div className="upload-image-grid-right-bottom upload-image-grid-item">
            <i className="fa-solid fa-plus fa-2xl"></i>
          </div> */}
        </div>
      </label>
    </div>
  );
};

export default ProfileImageContaienr;
