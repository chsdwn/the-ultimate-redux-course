import configureStore from "./store/configureStore";
import * as apiActions from "./store/api";

const store = configureStore();

store.dispatch(
  apiActions.apiCallBegan({
    url: "/bugs",
    onSuccess: "bugsReceived",
  })
);
