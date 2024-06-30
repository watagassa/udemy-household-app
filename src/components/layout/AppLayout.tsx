import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
    <div>AppLayout</div>
    {/* 子のページを表示 */}
    <Outlet/>
    </>
  )
}

export default AppLayout