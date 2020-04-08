import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // actions => action handlers
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((b) => b.id === bugId);
      bugs.list[index].userId = userId;
    },
    bugRemoved: (bugs, action) => {
      const index = bugs.list.findIndex((b) => b.id === action.payload.id);
      bugs.list.splice(index, 1);
    },
    // resolveBug(command) - bugResolved(event)
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((b) => b.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
  },
});

export const {
  bugAdded,
  bugAssignedToUser,
  bugRemoved,
  bugResolved,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/bugs";

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const resolveBug = (id) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

// Selectors
// Memoization
// f(x) => y { input: 1, output: 2 }
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((b) => b.userId === userId)
  );
