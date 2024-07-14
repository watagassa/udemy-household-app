import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calendar.css"
import { EventContentArg } from '@fullcalendar/core'
const Calendar = () => {
  const events = [
    { title: 'Meeting', start: new Date() ,income:300,expense:200,balance:100 },
    { title: 'Meeting', start: "2024-07-20",income:300,expense:200,balance:100 },
  ]
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
    events={events}
    eventContent={renderEventContent}
    />

  )
}

export default Calendar