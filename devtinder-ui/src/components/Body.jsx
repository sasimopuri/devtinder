import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Body = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default Body