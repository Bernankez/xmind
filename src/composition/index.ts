import { Bill, Category } from "@/types";
import { DataType, csvHelper } from "@/utils/helper";
import { readonly } from "vue";

let bill: Bill[];
let category: Category[];

const billType: DataType = new Map([["time", "Date"], ["type", "number"], ["category", "string"], ["amount", "number"]]);

export function useBill(): Promise<ReadonlyArray<Bill>> {
  return new Promise<Bill[]>((resolve, reject) => {
    if (!bill) {
      const billPromise = import("@/model/bill.csv?raw");
      billPromise.then(res => {
        bill = csvHelper(res.default, billType);
        resolve(bill);
      }).catch(e => {
        reject(e);
      });
    } else {
      resolve(bill);
    }
  });
}

const categoryType: DataType = new Map([["id", "string"], ["name", "string"], ["type", "number"]]);

export function useCategory() {
  return new Promise<Category[]>((resolve, reject) => {
    if (!category) {
      const categoryPromise = import("@/model/categories.csv?raw");
      categoryPromise.then(res => {
        category = csvHelper(res.default, categoryType);
        resolve(category);
      }).catch(e => {
        reject(e);
      });
    } else {
      resolve(category);
    }
  });
}