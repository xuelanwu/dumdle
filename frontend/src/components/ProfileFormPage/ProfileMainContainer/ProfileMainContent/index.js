import { useState } from "react";
import "./index.css";

const ProfileMainContent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [size, setSize] = useState(null);
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => console.log("***************** profile submit");

  return (
    <div className="main-content-container profile">
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          className="profile-input"
          placeholder="Dog Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <div className="checkbox-block">
          <input
            className="checkbox-gender"
            type="radio"
            name="gender"
            id="female"
            value="female"
          ></input>
          <label className="label-gender" for="female">
            <span>Female</span>
          </label>
        </div>

        <div className="checkbox-block">
          <input
            className="checkbox-gender"
            type="radio"
            name="gender"
            id="male"
            value="male"
          ></input>
          <label className="label-gender" for="male">
            <span>Male</span>
          </label>
        </div>

        <div className="checkbox-block">
          <input
            className="checkbox-gender"
            type="radio"
            name="gender"
            id="other"
            value="other"
          ></input>
          <label className="label-genderr" for="gender-other">
            <span>Other</span>
          </label>
        </div>

        <input
          className="profile-input"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        ></input>
        <textarea
          className="profile-input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </form>
    </div>
  );
};

export default ProfileMainContent;
