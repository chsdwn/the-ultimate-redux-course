import * as actions from "./actionTypes";

// []
let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
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
