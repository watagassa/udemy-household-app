//zodによるバリテーションチェック
//バリテーションチェックとは入力値が正しい形式や範囲に合致しているかどうかを検証すること
import { z } from "zod";

export const transactionSchema = z.object({
    //enumで列挙する
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付は必須です" }),
  amount: z.number().min(1, { message: "金額は1円以上必須です" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください" })
    .max(50, { message: "内容は50文字以内にしてください。" }),

    //ユニオン型の型注釈 中に列挙された型でないと弾く
  category: z
    .union([
      z.enum(["食費", "日用品", "住居費", "交際費", "娯楽", "交通費"]),
      z.enum(["給与", "副収入", "お小遣い"]),
      z.literal(""),
    ])
    //絞り込む=refine
    .refine((val) => val !== "", {
      message: "カテゴリを選択してください",
    }),
});
//inferでスキーマからTSの型を生成
export type Schema = z.infer<typeof transactionSchema>;