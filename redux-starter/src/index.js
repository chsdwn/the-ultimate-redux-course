import configureStore from "./store/configureStore";
import * as bugActions from "./store/bugs";
import * as projectActions from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("store changed");
});

store.dispatch(bugActions.bugAdded({ description: "Bug 1" }));
store.dispatch(bugActions.bugAdded({ description: "Bug 2" }));
store.dispatch(bugActions.bugAdded({ description: "Bug 3" }));
store.dispatch(bugActions.bugResolved({ id: 1 }));
store.dispatch(projectActions.projectAdded({ name: "Project 1" }));
store.dispatch(projectActions.projectAdded({ name: "Project 2" }));
console.log(store.getState());
