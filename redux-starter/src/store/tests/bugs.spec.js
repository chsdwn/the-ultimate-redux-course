import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  addBug,
  bugAdded,
  bugResolved,
  loadBugs,
  getUnresolvedBugs,
  resolveBug,
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
  const createState = () => ({ entities: { bugs: { list: [] } } });

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

  it("should mark the bug as resolved if it's saved to the server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if it's not saved to the server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(500);
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugsSlice().list[0].resolved).not.toBe(true);
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

  describe("selectors", () => {
    it("getUnresolvedBugs", () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
