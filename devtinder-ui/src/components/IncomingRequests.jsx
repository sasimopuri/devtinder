import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import ConnectionsList from "./ConnectionsList";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncommingRequests,
  removeRequest,
} from "../utils/incommingRequestsSlice";

const IncomingRequests = () => {
  const requests = useSelector((state) => state?.incommingRequests);

  const count = requests?.length;
  const dispatch = useDispatch();

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.patch(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
      //   setRequests(useSelector((state) => state?.incomingRequests))
    } catch (err) {
      console.log("Error", err);
    }
  };
  //   setRequests(useSelector((state) => state?.incomingRequests));
  const fetchIncommingRequests = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/user/getConnectionRequests",
        {
          withCredentials: true,
        }
      );
      const data = response?.data;
      dispatch(addIncommingRequests(data?.connectionRequests));
    } catch (err) {
      console.log("Error", err);
    }
  };
  useEffect(() => {
    fetchIncommingRequests();
  }, []);

  const connectionRequests = requests?.map((req) => (
    <ConnectionsList
      connection={req}
      isIncommingRequests={true}
      reviewRequest={reviewRequest}
    />
  ));
  return count === 0 ? (
    <>
      {" "}
      <div className="flex flex-col items-center mt-6 ">
        <div className="card-body">
          <h2 className="card-title">
            No matches yet!
          </h2>
          <div className="font-semibold">Don't worry, the perfect connection is out there.
            Keep exploring, we'll let you know the moment someone reaches out!</div>
        </div>
      </div>
    </>
  ) : (
    <>{connectionRequests}</>
  );
};

export default IncomingRequests;
