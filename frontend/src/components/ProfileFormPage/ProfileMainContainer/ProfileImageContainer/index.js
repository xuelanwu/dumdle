import "./index.css";

const ProfileImageContaienr = () => {
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer.files);
  };
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
          <div className="upload-image-grid-left upload-image-grid-item">
            <i className="fa-solid fa-plus fa-2xl"></i>
          </div>
          <div className="upload-image-grid-right-top upload-image-grid-item">
            <i className="fa-solid fa-plus fa-2xl"></i>
          </div>
          <div className="upload-image-grid-right-bottom upload-image-grid-item">
            <i className="fa-solid fa-plus fa-2xl"></i>
          </div>
        </div>
      </label>
    </div>
  );
};

export default ProfileImageContaienr;
