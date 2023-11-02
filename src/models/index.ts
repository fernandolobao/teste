export enum LOADING {
  INITIAL = 1,
  FETCH_TRANSACTION,
  FIND_TOP_EARNER,
  SUBMIT,
}

export interface Transaction {
  transactionID: string;
  timeStamp: string;
  amount: 6257;
  type: "alpha" | "beta";
  location: {
    name: string;
    id: string;
  };
  employee: {
    name: string;
    id: string;
    categoryCode: string;
  };
}
export interface TaskState {
  loading: number;
  id: string | undefined;
  transactions: Transaction[];
  done: boolean;
}
