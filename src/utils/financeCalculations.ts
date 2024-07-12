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