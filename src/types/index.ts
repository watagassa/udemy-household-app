import { string } from "zod";
import Calendar from "../components/Calendar";
//Transaction ＝　商売
//income 収入 expense 費用
//型エイリアス type interfaceと違い、Mapped Typesが使える
// "income" | "expense" この書き方はユニオン型
// Mapped Types
export type TransactionType = "income" | "expense";
export type IncomeCategory = "副収入" | "お小遣い" | "給与";
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
export interface Balance {
  income: number;
  expense: number;
  balance: number;
}

export interface CalendarContent {
  start: string;
  //３桁ごとコンマ区切りにしたいので文字列
  income: string;
  expense: string;
  balance: string;
}

// プロ演のメモ書き
//　材料　材料名と分量
export interface Ingredient {
  name: string;
  amount: string;
}

//説明文　画像とテキスト
export interface Description{
  image?: "string";
  text: "string";
}

export interface Recipe {
  id: string;
  cookingName: string;
  image?: string;
  time?: number;//料理時間
  comment?: string;
  howMany: string;//何人前
  Ingredients: Ingredient[];
  Descriptions?: Description[];
}

