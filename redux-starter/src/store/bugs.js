import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    // actions => action handlers
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugRemoved: (bugs, action) => {
      const index = bugs.findIndex((b) => b.id === action.payload.id);
      bugs.splice(index, 1);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((b) => b.id === action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
export default slice.reducer;

// Selectors
// Memoization
// f(x) => y { input: 1, output: 2 }
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);
