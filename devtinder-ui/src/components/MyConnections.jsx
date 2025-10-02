import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import ConnectionsList from "./ConnectionsList";
import { Link } from "react-router-dom";
const MyConnections = () => {
  const [connections, setConnections] = useState([]);
  const [isConnectionsExist, setIsConnectionsExist] = useState(false);
  const fetchMyConnections = async () => {
    const response = await axios.get(BASE_URL + "/user/getConnections", {
      withCredentials: true,
    });
    // console.log("res",connections);
    response?.data?.count > 0 && setIsConnectionsExist(true);
    setConnections(response?.data?.data);
    console.log(response?.data?.data);
  };
  useEffect(() => {
    fetchMyConnections();
  }, []);

  const connectionsComponent =
    isConnectionsExist &&
    connections?.map((connection) => (
      <ConnectionsList connection={connection} />
    ));

  return (
    <>
      {isConnectionsExist ? (
        <div className="flex flex-col items-center mt-6">
          <h1>Connections </h1>
          {connectionsComponent}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-6 ">
          <div className="card-body">
            <h2 className="card-title">
              It's quiet in here... No connections yet!
            </h2>
            <div className="font-semibold">
              {" "}
              Discover new developers and send requests from the{" "}
              <Link to="/">
                <div className="badge bg-blue-300 rounded-lg">
                  👩‍💻 Dev's Page
                </div>
              </Link>{" "}
              to kickstart your connections!
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyConnections;
