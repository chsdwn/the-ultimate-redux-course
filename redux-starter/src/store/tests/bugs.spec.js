import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  addBug,
  bugAdded,
  bugResolved,
  loadBugs,
  getUnresolvedBugs,
} from "../bugs";
import configureStore from "../configureStore";

// This is an integration test, not unit test
describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  it("should add the bug to the store if it's saved to the server", async () => {
    // AAA pattern

    // Arrange
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it's not saved to the server", async () => {
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  it("bugResolved", () => {
    const bug = { id: 1, description: "a" };

    store.dispatch({ type: bugAdded.type, payload: bug });
    store.dispatch({ type: bugResolved.type, payload: { id: bug.id } });

    expect(bugsSlice().list[0].resolved).toEqual(true);
  });

  it("loadBugs", async () => {
    const bug = { id: 1, description: "a" };
    const bug2 = { id: 2, description: "b" };

    await store.dispatch({ type: bugAdded.type, payload: bug });
    await store.dispatch({ type: bugAdded.type, payload: bug2 });

    expect(bugsSlice().list).toHaveLength(2);
  });

  it("getUnresolvedBugs", async () => {
    const bug = { id: 1, description: "a", resolved: true };
    const bug2 = { id: 2, description: "b", resolved: false };

    await store.dispatch({ type: bugAdded.type, payload: bug });
    await store.dispatch({ type: bugAdded.type, payload: bug2 });

    expect(bugsSlice().list.filter((b) => !b.resolved)).toHaveLength(1);
  });
});
