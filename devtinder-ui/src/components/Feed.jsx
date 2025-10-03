import { useEffect, useState } from "react";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, DEFAULT_USER_IMG } from "../utils/constants";
const Feed = () => {
  const dispatch = useDispatch();
  const feedDetails = useSelector((state) => state.feed);
  const feedData = feedDetails?.allUsers || [];
  const count = feedDetails?.count || 0;
  const [outOfUsers, setOutOfUsers] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fetchFeed = async () => {
    try {
      console.log("inside fet");

      const response = await axios.get(
        BASE_URL + `/user/feed/${currentIndex === 0 ? 1 : 2}/5`,
        {
          withCredentials: true,
        }
      );
      const data = response?.data;
      dispatch(
        addFeed({
          count: count + data?.count,
          allUsers: [...feedData, ...data?.allUsers],
        })
      );
      if (data?.count === 0) {
        setOutOfUsers(true);
      }
      console.log(response?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if ((!outOfUsers && !feedData) || feedData?.length - currentIndex < 2) {
      fetchFeed();
    }
  }, [currentIndex, outOfUsers]);

  const handleRequest = async (type) => {
    try {
      await axios.post(
        BASE_URL + `/request/send/${type}/${feedData[currentIndex]._id}`,
        {},
        { withCredentials: true }
      );
      setCurrentIndex((prevState) => prevState + 1);
    } catch (err) {
      console.log("Error", err);
    }
  };

  if (!feedData) {
    return;
  }

  const userData = feedData[currentIndex];
  console.log("FeedData", userData);
  if (!userData) {
    return (
      <div className="text-center mt-10">
        No more profiles to show right now! 😊
      </div>
    );
  }
  return (
    <div className="flex justify-center mt-6">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={
              userData &&
              (userData.photoUrl ? userData.photoUrl : DEFAULT_USER_IMG)
            }
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
              {userData?.gender &&
                userData?.gender[0]?.toUpperCase() + userData?.gender.slice(1)}
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
            <button
              className="btn bg-red-200 rounded-xl"
              onClick={() => handleRequest("ignored")}
            >
              Ignore
            </button>
            <button
              className="btn bg-green-200 rounded-xl"
              onClick={() => handleRequest("interested")}
            >
              Send Request{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
