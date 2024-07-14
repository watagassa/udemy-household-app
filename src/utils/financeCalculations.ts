import { Balance, Transaction } from "../types/index";

export function financeCalculations(transactions:Transaction[]):Balance{
    //reduceはreturn accの値を引き継いで配列の最初から最後までループする
    //acc 前回のループの時の値 初期値は{income:0,expense:0,balance:0}
    return transactions.reduce((acc,transaction) =>{
        if (transaction.type === "income") {
            //収入
            acc.income += transaction.amount;
          } else {
            //支出
            acc.expense += transaction.amount;
          }
          //　残高
          acc.balance = acc.income - acc.expense;
          return acc;
          //初期値の値
    },{income:0,expense:0,balance:0})
}

//日付ごとの収支を計算する関数💰
export function calculateDailyBalances(
  transactions: Transaction[]
): Record<string, Balance> {
  //    キー　　　　　　　バランス型 accとtransactionの型
  // "2024-07-20",{income:300,expense:200,balance:100 }　
  //RecordはMap関数の中の値のようにキーと値を持つ
  //                          最終的な戻り値もRecord<string, Balance>であることを明記
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;
    //日付が存在しない場合
    //日付をキーとしたRecordを作成している

    if (!acc[day]) {
      acc[day] = { income: 0, expense: 0, balance: 0 };
    }
    if (transaction.type === "income") {
      acc[day].income += transaction.amount;
    } else {
      acc[day].expense += transaction.amount;
    }

    acc[day].balance = acc[day].income - acc[day].expense;
    return acc;
    //今回の初期値（accに入れておく値）は空
  }, {});
}