import { useEffect, useState } from "react";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { BASE_URL, DEFAULT_USER_IMG } from "../utils/constants";
const Feed = () => {
  const dispatch = useDispatch();
  const [feedData, setFeedData] = useState();
  const fetchFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/feed/1/10", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data));
      setFeedData(response?.data);
      console.log(response?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  const userData = feedData && feedData?.allUsers[0];
  return (
    <div className="flex justify-center mt-6">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={
              feedData?.allUsers &&
              (userData.photoUrl ? userData.photoUrl : DEFAULT_USER_IMG)
            }
            // src={feedData?.allUsers[1]?.imageUrl} why this is not working?
            alt="Pic"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {userData?.firstName + " " + userData?.lastName}
          </h2>

          <div className="flex overflow-auto">
            <p>
              <span className="font-semibold">Email:</span> {userData?.email}
            </p>
            <p>
              <span className="font-semibold">Age:</span> {userData?.age}
            </p>
            <p>
              <span className="font-semibold">Gender: </span>
              {userData?.gender[0].toUpperCase() + userData?.gender.slice(1)}
            </p>
          </div>
          <p>
            <span className="font-semibold">Skills: </span>{" "}
            {userData?.skills ? userData?.skills : " None"}
          </p>
          <p className="">
            <span className="font-semibold">Description: </span>
            {userData?.description}
          </p>

          <div className="card-actions justify-center">
            <button className="btn bg-red-200 rounded-xl">Ignore</button>
            <button className="btn bg-green-200 rounded-xl">
              Send Request{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
