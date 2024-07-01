import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionForm from '../components/TransactionForm'
import TransactionMenu from '../components/TransactionMenu'

const Home = () => {
  return (
    <Box sx= {{display: "flex"}}>
        {/* 左側コンテンツ */}
        <Box sx={{flexGrow:1}}>
            <MonthlySummary />
            <Calendar/>
        </Box>
        {/* 右側コンテンツ */}
        <Box>
            <TransactionMenu />
            <TransactionForm/>
        </Box>
    </Box>
  )
}

export default Home