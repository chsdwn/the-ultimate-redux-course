import store from "./store";
import { bugAdded, bugResolved } from "./actions";

const dispatch = store.dispatch;

dispatch(bugAdded("Bug 1"));
console.log(store.getState());

dispatch(bugAdded("Bug 2"));
dispatch(bugResolved(1));
console.log(store.getState());
