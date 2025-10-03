import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: null,
    gender: "",
    skills: "",
    description: "",
    password: "",
    photoUrl: "",
  });
  const {
    firstName,
    lastName,
    email,
    gender,
    age,
    photoUrl,
    skills,
    description,
    password,
  } = userData;
  const [rePassword, setRePassword] = useState(null);
  const [isPasswordMisMatch, setIsPasswordMisMatch] = useState(false);
  const navigate = useNavigate()
  const handleValueChange = (e) => {
    if (e.target.name === "repassword") {
      console.log("repas");
      let repassword = e.target.value;
      setRePassword(repassword);
      if (rePassword?.length > 4 && repassword != userData?.password) {
        setIsPasswordMisMatch(true);
      } else {
        setIsPasswordMisMatch(false);
      }
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSignup= async ()=>{
    try{

      const response = await axios.post(BASE_URL+"/signup",userData,{withCredentials:true})
      navigate("/login")
    }
    catch (err){
      console.log("Error", err);
      setError(err?.response?.data);
      setTimeout(()=>{
        setError(null)
      },5000)
    }
  }
  return (
    <>
      <div className="flex justify-center mt-20">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="flex flex-col justify-center ">
            <label className="label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="input rounded-lg"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleValueChange(e)}
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              className="input rounded-lg"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => handleValueChange(e)}
            />
            <label className="label">Email</label>
            <input
              type="email"
              className="input rounded-lg"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={(e) => handleValueChange(e)}
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input rounded-lg"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={(e) => handleValueChange(e)}
            />
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input rounded-lg"
              placeholder="password"
              name="repassword"
              required
              value={rePassword}
              onChange={(e) => handleValueChange(e)}
            />
            {isPasswordMisMatch && (
              <div role="alert" className="h-7 w-full rounded-lg bg-red-400 text-white p-3 mt-1 badge">
                <span>Password Mismatch!</span>
              </div>
            )}
            <label className="label">Age</label>
            <input
              type="number rounded-lg"
              className="input rounded-lg"
              placeholder="Age"
              name="age"
              required
              value={age}
              onChange={(e) => handleValueChange(e)}
            />
            <label className="label">Gender</label>
            <input
              type="number rounded-lg"
              className="input rounded-lg"
              placeholder="Gender"
              name="gender"
              required
              value={gender && gender[0].toUpperCase() + gender.slice(1)}
              onChange={(e) => handleValueChange(e)}
            />
            <label className="label">Image URL</label>
            <input
              type="number rounded-lg"
              className="input rounded-lg"
              placeholder="Image Url"
              name="photoUrl"
              value={photoUrl}
              onChange={(e) => handleValueChange(e)}
            />
            <label className="label">Skills</label>
            <input
              type="number rounded-lg"
              className="input rounded-lg"
              placeholder="Ex: React, Java, Node..."
              name="skills"
              required
              value={skills}
              onChange={(e) => handleValueChange(e)}
            />
            <label className="label">Description</label>
            <textarea
              type="text"
              className="textarea rounded-lg"
              placeholder="What are you looking for? (e.g., I'm a Java dev looking to collaborate)"
              name="description"
              value={description}
              onChange={(e) => handleValueChange(e)}
            />
          </div>
          {error && (
            <div role="alert" className="alert alert-error text-white ">
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <button
            className="btn btn-neutral rounded-lg mt-1"
            onClick={handleSignup}
          >
            SignUp
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default SignUp;
