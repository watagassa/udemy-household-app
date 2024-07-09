//Transaction ＝　商売
//income 収入 expense 費用
//型エイリアス type interfaceと違い、Mapped Typesが使える
export type TransactionType = "income" | "expense";
export type IncomeCategory = "収入" | "副収入" | "お小遣い";
export type ExpenseCategory =
  | "食費"
  | "日用品"
  | "住居費"
  | "交際費"
  | "娯楽"
  | "交通費";
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  content: string;
  type: TransactionType;
  category: IncomeCategory | ExpenseCategory;
}
