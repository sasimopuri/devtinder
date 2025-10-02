import { createSlice } from "@reduxjs/toolkit";

const incommingRequestSlice = createSlice({
  name: "incommingRequests",
  initialState: null,
  reducers: {
    addIncommingRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {

      return state.filter(
        (req) => (
          console.log("Inside reqremo", req._id, action.payload),
          req._id !== action.payload
        )
      );
    },
  },
});
export const { addIncommingRequests, removeRequest } =
  incommingRequestSlice.actions;

export default incommingRequestSlice.reducer;
