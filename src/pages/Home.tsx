import { Box } from "@mui/material";
import React, { useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionForm from "../components/TransactionForm";
import TransactionMenu from "../components/TransactionMenu";
import { Transaction } from "../types/index";
import { format } from "date-fns";
import { Schema } from "../validations/schema";

interface HomeProps {
  monthlyTransactions: Transaction[];
  //(vscode)AppにあるsetCurrentMonthにマウスを置いておくと型がポップアップ表示されるよ
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  onSaveTransaction : (transaction: Schema) => Promise<void>;
}

const Home = ({ monthlyTransactions, setCurrentMonth,onSaveTransaction }: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });
  //console.log(dailyTransactions);
  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  };
  //フォームの開閉処理
  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  };
  //取引が選択されたときの処理
  const handleSelectTransaction = (transaction:Transaction) => {
    //取引のカードが押された時にその取引フォームを開く
    setIsEntryDrawerOpen(true);
    console.log(transaction);
  }
  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側コンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
        />
      </Box>
      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransacitonForm={handleAddTransactionForm}
          onSelectTransaction = {handleSelectTransaction}
        />
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          onSaveTransaction = {onSaveTransaction}
        />
      </Box>
    </Box>
  );
};

export default Home;
