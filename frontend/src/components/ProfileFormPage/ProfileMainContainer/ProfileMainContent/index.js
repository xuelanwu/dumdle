import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createProfile,
  deleteProfile,
  editProfile,
} from "../../../../store/session";
import ProfileImageContaienr from "../ProfileImageContainer";

import { AGE, SIZE } from "./constants";

import "./index.css";

const ProfileMainContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const dog = useSelector((state) => state.session.profile);

  const [name, setName] = useState("");
  const [age, setAge] = useState("age");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState([]);

  const [showAgeMenu, setShowAgeMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);

  useEffect(() => {
    if (dog) {
      console.log("************* dog", dog);
      const { name, age, gender, size, breed, description } = dog;
      setName(name);
      setAge(age);
      setGender(gender);
      setSize(size);
      setBreed(breed);
      setDescription(description);
    } else {
      setName("");
      setAge("");
      setGender("");
      setSize("");
      setBreed("");
      setDescription("");
    }
  }, [dog]);

  const openAgeMenu = (e) => {
    e.preventDefault();
    if (showAgeMenu) return;
    const block = document.querySelector(".select-button.age");
    block.style.border = "1px solid #ffc629";
    setShowAgeMenu(true);
  };

  useEffect(() => {
    if (!showAgeMenu) return;
    const closeMenu = () => {
      const block = document.querySelector(".select-button.age");
      block.style.border = "1px solid #dcdcdc";
      setShowAgeMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showAgeMenu]);

  const openSizeMenu = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    if (showSizeMenu) return;
    const block = document.querySelector(".select-button.size");
    block.style.border = "1px solid #ffc629";
    setShowSizeMenu(true);
  };

  useEffect(() => {
    if (!showSizeMenu) return;
    const closeMenu = () => {
      const block = document.querySelector(".select-button.size");
      block.style.border = "1px solid #dcdcdc";
      setShowSizeMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showSizeMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dogInfo = { name, age, gender, size, breed, description };
    // console.log("***************** dogINFO", dogInfo);
    return dispatch(
      dog && user.id === dog.ownerId
        ? editProfile({ ...dogInfo, dogId: dog.id })
        : createProfile(dogInfo)
    )
      .then(() => history.push("/"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(
      dog &&
        user.id === dog.ownerId &&
        dispatch(deleteProfile({ dogId: dog.id }))
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="main-content-container profile">
      <form className="profile-form" onSubmit={handleSubmit}>
        <ProfileImageContaienr user={user} />
        <div className="profile-form-block">
          <label className="profile-label" htmlFor="name">
            <span>Name</span>
          </label>
          <input
            id="name"
            className="profile-input profile-text-input"
            placeholder="Dog Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="profile-form-block dropdown">
          <label className="profile-label">
            <span>Age</span>
          </label>
          <div className="profile-dropdown">
            {age === "" ? (
              <button
                className="profile-input select-button age default"
                onClick={openAgeMenu}
              >
                Age
                <span>
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>
            ) : (
              <button
                className="profile-input select-button age"
                onClick={openAgeMenu}
              >
                {age === 0
                  ? "Less than 1 year"
                  : age === 1
                  ? "1 year"
                  : age < 20
                  ? `${age} years`
                  : "20+ years"}
                {
                  <span>
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                }
              </button>
            )}
            {showAgeMenu && (
              <div className="profile-dropdown-menu">
                <div className="profile-dropdown-menu-inner">
                  {AGE.map((ele) => (
                    <button
                      key={ele}
                      value={ele}
                      onClick={() => setAge(ele)}
                      className={`${
                        ele === age ? "option-highlight" : "option"
                      }`}
                    >
                      {ele === 0
                        ? "Less than 1 year"
                        : ele === 1
                        ? "1 year"
                        : ele < 20
                        ? `${ele} years`
                        : "20+ years"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-form-block">
          <label className="profile-label">
            <span>Gender</span>
          </label>
          <div className="checkbox-container gender">
            <div className="checkbox-block profile-input">
              <input
                className="profile-checkbox gender"
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={gender === "female"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              ></input>
              <span className="checkmark">
                <i className="fa-solid fa-check"></i>
              </span>
              <label className="profile-label gender" htmlFor="female">
                <span>Female</span>
              </label>
            </div>

            <div className="checkbox-block profile-input">
              <input
                className="profile-checkbox gender"
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              ></input>
              <span className="checkmark">
                <i className="fa-solid fa-check"></i>
              </span>
              <label className="profile-label gender" htmlFor="male">
                <span>Male</span>
              </label>
            </div>

            <div className="checkbox-block profile-input">
              <input
                className="profile-checkbox gender"
                type="radio"
                name="gender"
                id="other"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              ></input>
              <span className="checkmark">
                <i className="fa-solid fa-check"></i>
              </span>
              <label className="profile-label gender" htmlFor="other">
                <span>Other</span>
              </label>
            </div>
          </div>
        </div>

        <div className="profile-form-block">
          <label className="profile-label" htmlFor="breed">
            <span>Breed</span>
          </label>
          <input
            className="profile-input profile-text-input"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          ></input>
        </div>

        <div className="profile-form-block dropdown">
          <label className="profile-label">
            <span>Size</span>
          </label>
          <div className="profile-dropdown">
            {size === "" ? (
              <button
                className="profile-input select-button size default"
                onClick={openSizeMenu}
              >
                Size
                <span>
                  <i className="fa-solid fa-chevron-down"></i>
                </span>
              </button>
            ) : (
              <button
                className="profile-input select-button size"
                onClick={openSizeMenu}
              >
                {size === "small"
                  ? "Small (0-25 lbs)"
                  : size === "medium"
                  ? "Medium (26-60 lbs)"
                  : size === "large"
                  ? "Large (61-100 lbs)"
                  : size === "giant"
                  ? "Giant (101 lbs or more)"
                  : ""}
                {
                  <span>
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                }
              </button>
            )}
            {showSizeMenu && (
              <div className="profile-dropdown-menu">
                <div className="profile-dropdown-menu-inner">
                  {SIZE.map((ele) => (
                    <button
                      key={ele}
                      value={ele}
                      onClick={(e) => setSize(e.target.value)}
                      className={`${
                        ele === size ? "option-highlight" : "option"
                      }`}
                    >
                      {ele === "small"
                        ? "Small (0-25 lbs)"
                        : ele === "medium"
                        ? "Medium (26-60 lbs)"
                        : ele === "large"
                        ? "Large (61-100 lbs)"
                        : ele === "giant"
                        ? "Giant (101 lbs or more)"
                        : ""}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-form-block">
          <label className="profile-label">
            <span>About Me</span>
          </label>
          <textarea
            className="profile-textarea"
            placeholder="Description"
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {dog && (
          <div className="profile-form-block profile-input profile-delete-block">
            <button className="profile-delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
        <div className="profile-form-block profile-input profile-submit-block">
          <button type="submit" className="profile-submit-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileMainContent;
