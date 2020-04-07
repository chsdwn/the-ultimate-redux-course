import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugAssignedToUser,
  bugResolved,
  getBugsByUser,
  getUnresolvedBugs,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

store.subscribe(() => {
  console.log("store changed");
});

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugResolved({ id: 1 }));

store.dispatch(projectAdded({ name: "Project 1" }));

store.dispatch(userAdded({ name: "User 1" }));
store.dispatch(userAdded({ name: "User 2" }));

store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

console.log(store.getState());

const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log(unresolvedBugs);

const bugsByUser = getBugsByUser(1)(store.getState());
console.log(bugsByUser);
