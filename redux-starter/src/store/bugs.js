import { createAction } from "@reduxjs/toolkit";

// Action creators
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugResolved = createAction("bugResolved");

// Reducer
let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);

    case bugResolved.type:
      // const updatedState = [...state];
      // const bug = updatedState.find((b) => b.id === action.payload.id);
      // bug.resolved = true;
      // return [...updatedState];
      return state.map((b) =>
        b.id !== action.payload.id ? b : { ...b, resolved: true }
      );

    default:
      return state;
  }
}
