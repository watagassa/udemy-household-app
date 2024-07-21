import { Box, Button } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
//バージョンによる違い
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";
import { addMonths } from "date-fns";
//  import { useAppContext } from "../context/AppContext";

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}
const MonthSelector = ({ currentMonth,setCurrentMonth }: MonthSelectorProps) => {
    //  newDateには選択された日付の情報が入っている
    //何も選択していない場合、nullになる
    const handleDateChange = (newDate: Date | null) => {
        //nullでないなら実行
      if (newDate) {
        setCurrentMonth(newDate);
      }
    };

    //先月ボタンを押したときの処理
    const handlePreviousMonth = () => {
        //先月の値をDate型のpreviousMonthに格納
      const previousMonth = addMonths(currentMonth, -1);
      setCurrentMonth(previousMonth);
    };

    //次月ボタンを押したときの処理
    const handleNextMonth = () => {
      const nextMonth = addMonths(currentMonth, 1);
      setCurrentMonth(nextMonth);
    };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      //日付の形式を日本語にする
      adapterLocale={ja}
      // monthAndYearが存在しないため、コメントアウト
      // DatePickerの方で違う形で指定する
      //   dateFormats={{ monthAndYear: "yyyy年 MM月" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
           onClick={handlePreviousMonth}
          color={"error"}
          variant="contained"
        >
          先月
        </Button>
        <DatePicker
            onChange={handleDateChange}
          value={currentMonth}
          label="年月を選択"
          sx={{ mx: 2, background: "white" }}
          //年と月のみ選択できるようにする
          views={["year", "month"]}
          //MMMM/YYYYだったのをフォーマット
          format="yyyy/MM"
          //中の値もフォーマット
          slotProps={{
            toolbar: {
              toolbarFormat: "yyyy/MM",
            },
            // dateFormats={{ monthAndYear: "yyyy年 MM月" }}の代わり
            calendarHeader: { format: "yyyy年MM月" },
          }}
        />
        <Button
          onClick={handleNextMonth}
          color={"primary"}
          variant="contained"
        >
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;
