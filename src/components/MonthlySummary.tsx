import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import { theme } from '../theme/theme';
import {
  AccountBalance,
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";
import { Transaction } from '../types/index'

interface MonthlySummaryProps {
    monthlyTransactions:Transaction[],
}

const MonthlySummary = ({monthlyTransactions}:MonthlySummaryProps) => {
    console.log(monthlyTransactions);
  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>
      {/* 収入 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card sx={{ bgcolor: (theme) => theme.palette.incomeColor.main, color: "white", borderRadius: "10px" ,flexGrow: 1,}}>
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowUpward></ArrowUpward>
              <Typography>収入</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ¥300
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* 支出 */}
      <Grid item xs={4} display={"flex"}>
        <Card sx={{ bgcolor:  (theme) => theme.palette.expeneColor.main, color: "white", borderRadius: "10px", flexGrow: 1,}}>
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <ArrowDownward></ArrowDownward>
              <Typography>支出</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ¥300
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* 残高 */}
      <Grid item xs={4} display={"flex"}>
        <Card sx={{ bgcolor: (theme) => theme.palette.balanceColor.main, color: "white", borderRadius: "10px", flexGrow: 1,}}>
          <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
            <Stack direction={"row"}>
              <AccountBalance></AccountBalance>
              <Typography>残高</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              }}
            >
              ¥300
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MonthlySummary;
