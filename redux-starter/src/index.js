import configureStore from "./store/configureStore";
import * as actions from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("store changed");
});

// store.dispatch(actions.bugAdded({ description: "Bug 1" }));
// store.dispatch(actions.bugAdded({ description: "Bug 2" }));
// store.dispatch(actions.bugAdded({ description: "Bug 3" }));
// store.dispatch(actions.bugResolved({ id: 1 }));
store.dispatch(actions.projectAdded({ name: "Project 1" }));
store.dispatch(actions.projectAdded({ name: "Project 2" }));
console.log(store.getState());
