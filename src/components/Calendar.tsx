import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Balance, CalendarContent, Transaction } from "../types";
import { formatCurrency } from "../utils/formatting";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";
import { isSameMonth } from "date-fns";
interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
}

const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
  today,
}: CalendarProps) => {
  //muiのuseTheme()を使用することでJSXの中でしか書けなかったtheme.palette.incomeColor.lightが書けるようになる
  const theme = useTheme();
  // const events = [
  //   { title: 'Meeting', start: new Date() ,income:300,expense:200,balance:100 },
  //   { title: 'Meeting', start: "2024-07-20",income:300,expense:200,balance:100 },
  // ]
  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };
  //calculateDailyBalances 日付ごとの収支を計算する関数
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);
  // ***2.FullCalendar用のイベントを生成する関数　CalendarContent[]の戻り値を持つ
  const createCalendarEvents = (
    dailyBalances: Record<string, Balance>
  ): CalendarContent[] => {
    //dailyBalanceのキー（日付）からmap関数で一つ一つ展開する
    return Object.keys(dailyBalances).map((date) => {
      //分割代入
      const { income, expense, balance } = dailyBalances[date];
      //n個目の配列の戻り値
      return {
        start: date,
        //コンマ区切りにする
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };
  //Calendar用のイベント作成
  const calendarEvent = createCalendarEvents(dailyBalances);

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };
  //月の日付取得
  //datesetInfoにはカレンダーの月情報が色々入っている
  //今回は今閲覧中の月が欲しい
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart;
    //閲覧中の月をsetCurrentMonthに入れる
    setCurrentMonth(datesetInfo.view.currentStart);
    const todayDate = new Date();
    //date-fnsのメソッド
    //月が変わった時、現在表示中の月が今月だった場合のみ
    if (isSameMonth(todayDate, currentMonth)) {
      //今日の日にちに日時を指定
      //todayはstring型　Date型ではない
      setCurrentDay(today);
    }
  };
  //dateClickの引き数の型DateClickArg
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  };
  //カレンダー表示
  return (
    <FullCalendar
      //日本語設定
      locale={jaLocale}
      //初期設定
      //日にちをグリットで刻む
      //plugins: [ interactionPlugin ] でdateClickが使えるようになる
      plugins={[dayGridPlugin, interactionPlugin]}
      //月で表示
      initialView="dayGridMonth"
      //calendarEventをスプレッド構文で展開し、一つ一つにbackgroundEventをつけていく
      //それらを配列としてeventsに渡す
      events={[...calendarEvent, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;
