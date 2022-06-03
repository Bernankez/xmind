export type Bill = {
  time: Date; // 账单时间
  type: 1 | 0; // 账单类型 1收入 0支出
  category?: string;
  amount: number;
}

export type Category = {
  id: string; // 分类标识符
  name: string; // 分类名称
  type: 1 | 0 // 分类类型 1收入 0支出
}

export type BillWithCategory = {
  categoryInfo?: { name: string; type: 1 | 0 }
} & Bill