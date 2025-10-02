import { useState } from "react";
import { BASE_URL, DEFAULT_USER_IMG } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditUserDetails = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const [isEdit, setIsEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const handleValueChange = (e) => {
    const updatedUser = {
      ...userData,
      [e.target.name]: e.target.value,
    };
    setUserData(updatedUser);
  };

  const handleSaveDetails = async () => {
    try {
      console.log(typeof user._id);

      await axios.patch(BASE_URL + `/updateUser/${user._id}`, userData, {
        withCredentials: true,
      });
      setIsEdit(false);
      setShowAlert(true); //Rewrite the logic with error msgs
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      dispatch(addUser(userData));
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="modal-box flex flex-col justify-center items-center">
      {showAlert && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your profile updated Successfully!</span>
        </div>
      )}
      {!isEdit ? (
        <div className="card bg-base-100 w-96 shadow-sm ">
          <figure>
            <img
              src={
                userData &&
                (userData.photoUrl ? userData.photoUrl : DEFAULT_USER_IMG)
              }
              // src={feedData?.alluserDatas[1]?.imageUrl} why this is not working?
              alt="Pic"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {userData?.firstName + " " + userData?.lastName}
            </h2>
            <div className="flex overflow-auto">
              <p>Email: {userData?.email}</p>
              <p>Age: {userData?.age}</p>
              <p>
                Gender:{" "}
                {userData?.gender[0].toUpperCase() + userData?.gender.slice(1)}
              </p>
            </div>
            <p>Skills:{userData?.skills ? userData?.skills : " None"}</p>
            <p>{userData?.skills && userData.skills}</p>
            <p className="-mt-2">Description: {userData?.description}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center ">
          <label className="label">First Name</label>
          <input
            type="text"
            name="firstName"
            className="input rounded-lg"
            placeholder="First Name"
            value={userData.firstName}
            onChange={(e) => handleValueChange(e)}
          />
          <label className="label">Last Name</label>
          <input
            type="text"
            className="input rounded-lg"
            placeholder="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={(e) => handleValueChange(e)}
          />
          <label className="label">Email</label>
          <input
            type="email"
            className="input rounded-lg"
            placeholder="Email"
            name="lastName"
            value={userData.email}
            disabled
          />
          <label className="label">Age</label>
          <input
            type="number rounded-lg"
            className="input rounded-lg"
            placeholder="Password"
            name="lastName"
            value={userData.age}
            disabled
          />
          <label className="label">Gender</label>
          <input
            type="number rounded-lg"
            className="input rounded-lg"
            placeholder="text"
            name="gender"
            value={userData.gender[0].toUpperCase() + user.gender.slice(1)}
            disabled
          />
          <label className="label">Image URL</label>
          <input
            type="number rounded-lg"
            className="input rounded-lg"
            placeholder="Image Url"
            name="photoUrl"
            value={userData.photoUrl}
            onChange={(e) => handleValueChange(e)}
          />
          <label className="label">Skills</label>
          <input
            type="number rounded-lg"
            className="input rounded-lg"
            placeholder="Skills"
            name="skills"
            value={userData.skills}
            onChange={(e) => handleValueChange(e)}
          />
          <label className="label">Description</label>
          <input
            type="text"
            className="input rounded-lg"
            placeholder="Description"
            name="description"
            value={userData.description}
            onChange={(e) => handleValueChange(e)}
          />
        </div>
      )}
      <div className="modal-action flex justify-center">
        {isEdit ? (
          <button className="btn rounded-md" onClick={handleSaveDetails}>
            Save
          </button>
        ) : (
          <button className="btn rounded-md" onClick={() => setIsEdit(true)}>
            Edit
          </button>
        )}
        <form method="dialog">
          <button className="btn rounded-md">Close</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
