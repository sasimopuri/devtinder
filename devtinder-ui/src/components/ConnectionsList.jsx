import axios from "axios";
import { BASE_URL, DEFAULT_USER_IMG } from "../utils/constants";

const ConnectionsList = ({
  connection,
  isIncommingRequests,
  reviewRequest,
}) => {
  if (!connection) {
    return;
  }
  const { firstName, lastName, gender, age, photoUrl, skills, description } =
    isIncommingRequests
      ? typeof connection?.fromUserId === "object"
        ? connection?.fromUserId
        : connection?.toUserId
      : connection;

  return (
    <div className="flex justify-center items-center mt-4">
      <ul className="list bg-violet-100 rounded-box shadow-md w-2xl">
        <li className="list-row flex just">
          <div>
            <img
              className="size-34 rounded-box"
              src={photoUrl ? photoUrl : DEFAULT_USER_IMG}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1 font-bold text-2xl min-w-xs">
            <div>{firstName + " " + lastName}</div>
            <div className="text-xs font-semibold flex gap-3">
              <span>Age : {age}</span>
              <span>
                Gender : {gender && gender[0]?.toUpperCase() + gender.slice(1)}
              </span>
            </div>
            <div className="text-xs font-semibold"></div>
            <div className="text-xs font-semibold">{description}</div>
            <div className="text-xs uppercase font-semibold">{skills}</div>
          </div>
          {isIncommingRequests && (
            <div className="flex gap-2 mt-10">
              <button
                className="btn btn-square  border-2 w-16 rounded-lg bg-purple-100"
                onClick={() =>
                  reviewRequest("accepted", connection?._id.toString())
                }
              >
                Accept
              </button>
              <button
                className="btn btn-square w-16 rounded-lg bg-purple-100"
                onClick={() =>
                  reviewRequest("rejected", connection?._id.toString())
                }
              >
                Reject
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ConnectionsList;
