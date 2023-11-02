import moment from "moment";
import { Transaction } from "../models";

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

export const findLastYearTopEarner = (transactions: Transaction[]) => {
  // Filter out everything not from the prior year
  const lastYearTransactions = transactions.filter(
    (transaction) =>
      moment(transaction.timeStamp).year() ===
      moment().subtract(1, "year").year()
  );
  // Group remaining transactions by employee id
  const groupedById = groupBy(lastYearTransactions, (i) => i.employee.id);
  let employeeRank: {
    id: string;
    amount: number;
  }[] = [];
  // Add all `amounts` and rank them desc
  for (let key in groupedById) {
    if (groupedById.hasOwnProperty(key)) {
      employeeRank.push({
        id: key,
        amount: groupedById[key].reduce(
          (sum: number, current: Transaction) => sum + current.amount,
          0
        ),
      });
    }
  }
  employeeRank = employeeRank.sort((a, b) => b.amount - a.amount);
  // Return only the transactions from `alpha` type from the top rank employee
  return {
    employee: employeeRank[0].id,
    ids: lastYearTransactions
      .filter(
        (t: Transaction) =>
          t.employee.id === employeeRank[0].id && t.type === "alpha"
      )
      .map((t) => t.transactionID),
  };
};
