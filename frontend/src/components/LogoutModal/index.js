import { useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

import "./index.css";
import { logout } from "../../store/session";

const LogoutModal = () => {
  const [showModal, setShowModal] = useState(false);
  // const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(logout())
      .then(() => setShowModal(false))
      .then(() => history.push("/"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="sidebar-logout-button"
      >
        Log out
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="logout-model-container">
            <h2>Are you sure you want to log out of Bumble?</h2>
            <div className="logout-model-button-block">
              <div className="logout-model-button-box">
                <button
                  onClick={handleLogout}
                  className="logout-model-button logout"
                >
                  Log out
                </button>
              </div>
              <div className="logout-model-button-box">
                <button
                  onClick={handleCancel}
                  className="logout-model-button cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LogoutModal;
