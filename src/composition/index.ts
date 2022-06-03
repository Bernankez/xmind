import { Bill, Categories } from "@/types";
import { DataType, handleCSV } from "@/utils/handle";

let bill: Bill[];
let categories: Categories[];

const billType: DataType = new Map([["time", "Date"], ["type", "number"], ["category", "string"], ["amount", "number"]]);

export function useBill(): Promise<Bill[]> {
  return new Promise((resolve, reject) => {
    if (!bill) {
      const billPromise = import("@/model/bill.csv?raw");
      billPromise.then(res => {
        bill = handleCSV(res.default, billType);
        resolve(bill);
      }).catch(e => {
        reject(e);
      });
    } else {
      resolve(bill);
    }
  });
}