import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let dummyId = 0;

const slice = createSlice({
  name: "teamMembers",
  initialState: [],
  reducers: {
    assignedBug: (teamMembers, action) => {
      const teamMember = teamMembers.find((t) => t.id === action.payload.id);
      teamMember.bugsIds.push(action.payload.bugId);
    },
    teamMemberAdded: (teamMembers, action) => {
      teamMembers.push({
        id: ++dummyId,
        name: action.payload.name,
        bugsIds: [],
      });
    },
  },
});

export const { assignedBug, teamMemberAdded } = slice.actions;
export default slice.reducer;

// Selectors
export const getAssignedBugIds = createSelector(
  (state) => state.entities.teamMembers,
  (state) => state.entities.bugs,
  (teamMembers, bugs) => teamMembers.find((t) => t.id === 1).bugsIds
);
