import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calendar.css"
import { EventContentArg } from '@fullcalendar/core'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { Balance, CalendarContent, Transaction } from '../types'
import { formatCurrency } from '../utils/formatting'
interface CalendarProps {
  monthlyTransactions: Transaction[];
}

const Calendar = ({monthlyTransactions}:CalendarProps) => {
  // const events = [
  //   { title: 'Meeting', start: new Date() ,income:300,expense:200,balance:100 },
  //   { title: 'Meeting', start: "2024-07-20",income:300,expense:200,balance:100 },
  // ]
  //calculateDailyBalances 日付ごとの収支を計算する関数
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  console.log(dailyBalances);
    // ***2.FullCalendar用のイベントを生成する関数　CalendarContent[]の戻り値を持つ
  const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
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
  const calendarEvent = createCalendarEvents(dailyBalances);
  const renderEventContent = (eventInfo:EventContentArg) =>{
    return(
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }
  return (
    <FullCalendar
    //日本語設定
    locale={jaLocale}
    //初期設定
    //日にちをグリットで刻む
    plugins={[dayGridPlugin]}
    //月で表示
    initialView='dayGridMonth'
    events={calendarEvent}
    eventContent={renderEventContent}
    />

  )
}

export default Calendar