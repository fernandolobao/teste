import { createReducer } from "@reduxjs/toolkit";
import type { RootState } from "../../reducers";
import { LOADING, TaskState } from "../../models";
import { fetchTasksAction, setLoadingStep, submitTaskAction } from "./actions";

// Define the initial state using that type
const initialState: TaskState = {
  loading: 1,
  id: undefined,
  transactions: [],
  done: false,
};

export const appReducer = createReducer(initialState, (app) => {
  app.addCase(
    fetchTasksAction.pending,
    (state: TaskState): TaskState => ({
      ...state,
      loading: LOADING.INITIAL,
    })
  );
  app.addCase(
    fetchTasksAction.fulfilled,
    (state: TaskState, { payload }): TaskState => ({
      ...state,
      id: payload.id,
      transactions: payload.transactions,
      loading: LOADING.FETCH_TRANSACTION,
    })
  );
  app.addCase(
    submitTaskAction.pending,
    (state: TaskState): TaskState => ({
      ...state,
      loading: LOADING.SUBMIT,
    })
  );
  app.addCase(
    submitTaskAction.fulfilled,
    (state: TaskState): TaskState => ({
      ...state,
      done: true,
    })
  );
  app.addCase(
    setLoadingStep,
    (state: TaskState, { payload }): TaskState => ({
      ...state,
      loading: payload,
    })
  );
});

export const selectTransactionID = (state: RootState) => state.app.id;
export const selectTransactions = (state: RootState) => state.app.transactions;
export const selectLoading = (state: RootState) => state.app.loading;
export const selectDone = (state: RootState) => state.app.done;

export default appReducer;
