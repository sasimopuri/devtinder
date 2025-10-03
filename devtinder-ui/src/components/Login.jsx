import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.user));
      navigate("/");
    } catch (err) {
      console.log("Error", err?.response?.data);
      setError(err?.response?.data);
      setTimeout(()=>{
        setError(null)
      },3000)
    }
  }

  return (
    <div className="flex justify-center mt-50">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Email</label>
        <input
          type="email"
          className="input rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input rounded-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
        <button className="btn btn-neutral rounded-lg mt-1" onClick={handleLogin}>
          Login
        </button>
      <div className="font-semibold badge badge-ghost rounded-lg ml-12"><Link to="/signup" >No Account? {" "} Signup now!</Link></div>
      </fieldset>
    </div>
  );
};

export default Login;
