import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const getUserDetails = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/getProfile", {
        withCredentials: true,
      });
      dispatch(addUser(response?.data));
    } catch (err) {
      navigate("/login");
      console.log(err);
    }
  };
  useEffect(() => {
    if (!user) {
      getUserDetails();
    }
  }, []);
  if (!user) {
    return;
  }
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Body;
