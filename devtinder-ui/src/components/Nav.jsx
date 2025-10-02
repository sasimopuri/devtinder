import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, DEFAULT_USER_IMG } from "../utils/constants";
import axios from "axios";
import EditUserDetails from "./EditUserDetails";

const Nav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("user", user);
  async function handleLogout() {
    try {
      await axios.get(BASE_URL + "/logout", { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
      <div className="flex gap-2 items-center mr-8">
        <h1>Welcome {user?.firstName}</h1>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoUrl ? user?.photoUrl : DEFAULT_USER_IMG}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-24 p-2 shadow"
          >
            <li>
              <Link>
                <button
                  className="btn"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Profile
                </button>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
        <dialog id="my_modal_1" className="modal">
          <EditUserDetails user={user}/>
        </dialog>
      </div>
    </div>
  );
};

export default Nav;
