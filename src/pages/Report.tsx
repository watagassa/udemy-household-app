import { Grid, Paper } from "@mui/material";
import React from "react";
import MonthSelector from "../components/MonthSelector";
import CategoryChart from "../components/CategoryChart";
import TransactionTable from "../components/TransactionTable";
import BarChart from "../components/BarChart";

interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}
const Report = ({currentMonth,setCurrentMonth}:ReportProps) => {
  const commonPaperStyle = {
    height: "400px",
    // flexGrowを使用するためにflex
    display: "flex",
    //flexだが、縦並びにしたいのでcolumn
    flexDirection: "column",
    p: 2,
  };

  return (
    <Grid container spacing={2}>
      {/* xsはMUIが用意しているブレークポイント */}
      <Grid item xs={12}>
        {/* 日付選択エリア */}
        <MonthSelector 
        currentMonth={currentMonth}
        setCurrentMonth = {setCurrentMonth}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        {/* MUIの Paperクラスは四角い紙を置いたようなデザイン*/}
        <Paper sx={commonPaperStyle}>
          {/* 円グラフ */}
          <CategoryChart />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}>
          {/* 棒グラフ */}
          <BarChart />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        {/* テーブル */}
        <TransactionTable />
      </Grid>
    </Grid>
  );
};

export default Report;