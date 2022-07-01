import { createSlice } from "@reduxjs/toolkit";
import { usersVacationsApi } from "./userVacationsApiSlice";
import { Vacations } from "./vacations.interface";

const usersVacationsSliceInitVal: Vacations[] = [];
const usersVacationsSlice = createSlice({
  name: "usersVacations",
  initialState: usersVacationsSliceInitVal,
  reducers: {
    setAllVacations: (state, action) => {
      return [...state, ...action.payload];
    },
  },
});

export const { setAllVacations } = usersVacationsSlice.actions;
export default usersVacationsSlice.reducer;

export const selectAllVacations = (state: { usersVacations: Vacations[] }) =>
  state.usersVacations;
