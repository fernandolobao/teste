import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks, submitTask } from "../../services";
import { RootState } from "..";

export const fetchTasksAction = createAsyncThunk(
  "GET_APP_TASKS",
  async () => await fetchTasks()
);

export const submitTaskAction = createAsyncThunk<
  void,
  { result: string[] },
  { state: RootState }
>("SUBMIT_APP_TASK", async (params, { getState, dispatch }) => {
  const id = getState().app.id;
  if (id && params.result.length > 0) await submitTask(id, params.result);
});

export const setLoadingStep = createAction<number>("SET_APP_LOADING_STEP");
