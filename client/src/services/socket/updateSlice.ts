import { createSlice } from "@reduxjs/toolkit";
type updates = {
  vacationsIsUpdated: boolean;
};
const updatesSlice = createSlice({
  name: "updates",
  initialState: { vacationsIsUpdated: false},
  reducers: {
    setVacationIsUpdated: (state, action) => {
      return { ...state, vacationsIsUpdated: action.payload };
    },
  },
});

export const { setVacationIsUpdated } = updatesSlice.actions;

export default updatesSlice.reducer;

export const selectVacationsIsUpdated = (state: { updates: updates }) =>
  state.updates.vacationsIsUpdated;
