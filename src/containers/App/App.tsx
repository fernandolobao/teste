import React, { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchTasksAction,
  setLoadingStep,
  submitTaskAction,
} from "../../reducers/tasks/actions";
import { Alert, Spin } from "antd";
import {
  selectDone,
  selectLoading,
  selectTransactions,
} from "../../reducers/tasks/reducer";
import { LOADING } from "../../models";
import { findLastYearTopEarner } from "../../helpers";

function App() {
  const dispatch = useAppDispatch();
  const loadingStep = useAppSelector(selectLoading);
  const transactions = useAppSelector(selectTransactions);
  const [topAlphaTransactions, setTopAlphaTransactions] = useState<string[]>(
    []
  );
  const isDone = useAppSelector(selectDone);

  useEffect(() => {
    dispatch(fetchTasksAction());
  }, []);

  useEffect(() => {
    if (loadingStep === LOADING.FETCH_TRANSACTION) {
      setTopAlphaTransactions(findLastYearTopEarner(transactions).ids);
      dispatch(setLoadingStep(LOADING.FIND_TOP_EARNER));
    }
    if (
      loadingStep === LOADING.FIND_TOP_EARNER &&
      topAlphaTransactions.length > 0
    ) {
      dispatch(submitTaskAction({ result: topAlphaTransactions }));
    }
  }, [loadingStep]);

  const initialLoad = (done: boolean) => (
    <Alert
      className="step"
      message={done ? "Initial State loaded" : "Loading initial state"}
      type={done ? "success" : "info"}
    />
  );

  const transactionLoad = (done: boolean) => (
    <Alert
      className="step"
      message={done ? "Transactions loaded" : "Transactions being loaded"}
      type={done ? "success" : "info"}
    />
  );

  const topEarner = (done: boolean) => (
    <Alert
      className="step"
      message={done ? "Employee found" : "Finding last year's top earner"}
      type={done ? "success" : "info"}
    />
  );

  const submitTask = (done: boolean) => (
    <Alert
      className="step"
      message={isDone ? "Done" : "Submiting las year's top alpha earner"}
      type={isDone ? "success" : "info"}
    />
  );

  const renderByLoadingStep = (step: number) => {
    switch (step) {
      case LOADING.INITIAL:
        return <Spin tip="Loading...">{initialLoad(false)}</Spin>;

      case LOADING.FETCH_TRANSACTION:
        return (
          <Spin tip="Loading...">
            {initialLoad(true)}
            {transactionLoad(false)}
          </Spin>
        );
      case LOADING.FIND_TOP_EARNER:
        return (
          <Spin tip="Loading...">
            {initialLoad(true)}
            {transactionLoad(true)}
            {topEarner(false)}
          </Spin>
        );
      case LOADING.SUBMIT:
        return (
          <Spin tip="Loading..." spinning={!isDone}>
            {initialLoad(true)}
            {transactionLoad(true)}
            {topEarner(true)}
            {submitTask(isDone)}
          </Spin>
        );
      default:
        return <Alert message="Transactions loaded" type="info" />;
    }
  };

  return <div className="App">{renderByLoadingStep(loadingStep)}</div>;
}

export default App;
