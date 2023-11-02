import { FETCH } from "../constants/app";
import { TaskState } from "../models";

export const fetchTasks = (): Promise<TaskState> =>
  fetch(FETCH.LIST, {
    method: "GET",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((response) => response.json());

export const submitTask = (
  id: string,
  result: string[]
): Promise<void | Response> =>
  fetch(FETCH.SUBMIT, {
    method: "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ id, result }),
  }).then((response) => response);
