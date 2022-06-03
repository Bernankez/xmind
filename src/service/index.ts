import { useBill, useCategory } from "@/composition";
import { Bill, BillWithCategory } from "@/types";
import { categoryHelper } from "@/utils/helper";
import dayjs from "dayjs";

export function getBill() {
  return new Promise<BillWithCategory[]>(async (resolve, reject) => {
    try {
      const bills = (await useBill()).concat(getBillLocally());
      const categories = categoryHelper(await useCategory());
      const billWithCategory: BillWithCategory[] = bills.map(bill => {
        return Object.assign({}, bill, bill.category ? { categoryInfo: categories.get(bill.category) } : {});
      });
      resolve(billWithCategory);
    } catch (e) {
      reject(e);
    }
  });
}

export function getBillByInfo(options?: { month: string, category: string }) {
  return new Promise<BillWithCategory[]>(async (resolve, reject) => {
    try {
      const billWithCategory = await getBill();
      let temp: BillWithCategory[] = billWithCategory;
      if (options?.month) {
        const mon = dayjs(options.month);
        temp = temp.filter(bill => {
          return mon.isSame(dayjs(bill.time), "month");
        });
      }
      if (options?.category) {
        temp = temp.filter(bill => {
          return bill.category === options.category;
        });
      }
      resolve(temp);
    } catch (e) {
      reject(e);
    }
  });
}


const KEY_BILL = "data-bill";

function addBillLocally(bill: Bill) {
  let billList = JSON.parse(localStorage.getItem(KEY_BILL) as string) || [];
  billList.concat(bill);
  return true;
}

function getBillLocally(): Bill[] {
  return JSON.parse(localStorage.getItem(KEY_BILL) as string) || [];
}