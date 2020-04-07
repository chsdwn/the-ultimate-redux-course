import configureStore from "./store/configureStore";
import { bugAdded, bugResolved, getUnresolvedBugs } from "./store/bugs";
import { projectAdded } from "./store/projects";
import {
  assignedBug,
  teamMemberAdded,
  getAssignedBugIds,
} from "./store/teamMembers";

const store = configureStore();

store.subscribe(() => {
  console.log("store changed");
});

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(teamMemberAdded({ name: "Ali" }));
store.dispatch(assignedBug({ id: 1, bugId: 1 }));
console.log(store.getState());

const unresolvedBugs = getUnresolvedBugs(store.getState());
console.log(unresolvedBugs);

const assignedBugs = getAssignedBugIds(store.getState());
console.log(assignedBugs);
