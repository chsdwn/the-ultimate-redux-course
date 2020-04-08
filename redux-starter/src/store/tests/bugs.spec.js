import { addBug } from "../bugs";
import configureStore from "../configureStore";

// This is an integration test, not unit test
describe("bugsSlice", () => {
  it("should handle the addBug action", async () => {
    const store = configureStore();
    const bug = { description: "a" };
    await store.dispatch(addBug(bug));
    expect(store.getState().entities.bugs.list).toHaveLength(1);
  });
});
