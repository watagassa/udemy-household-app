import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionForm from '../components/TransactionForm'
import TransactionMenu from '../components/TransactionMenu'
import { Transaction } from '../types/index'

interface HomeProps {
    monthlyTransactions:Transaction[],
}
const Home = ({monthlyTransactions}:HomeProps) => {
  return (
    <Box sx= {{display: "flex"}}>
        {/* 左側コンテンツ */}
        <Box sx={{flexGrow:1}}>
            <MonthlySummary monthlyTransactions = {monthlyTransactions}/>
            <Calendar monthlyTransactions = {monthlyTransactions}/>
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