import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { Transaction } from "./types/index";
import { collection, getDocs} from "firebase/firestore";
import { db } from "./firebase";
function App() {
  //firebaseのデータを保持するためのuseState typesの中のTransaction型を使用
  //取引の記録を保存する
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  //初回レンダリング時のみ（最後の引数の[]が空）
  //async functionは呼び出されるとPromiseを返す。

  useEffect(() => {
    //useEffectにasyncがつけられないために作った関数
    const fecheTransaction = async() => {
      try {
        //dbはfirebaseの初期化ファイルで設定した物　　　firebaseにあるコレクション名
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        console.log(querySnapshot);
        //foreachで
        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          //doc.data()だけだとidがないため
          return {
            ...doc.data(),
            id: doc.id,
            //型アサーション これはTransactionですよと開発者が伝えるためのもの
            //でも、もし中身がTransaction型と違っていてもTransaction型と判断してしまう
          }as Transaction
        });
        console.log(transactionsData);
        setTransactions(transactionsData);
      } catch (err) {}
    }
    fecheTransaction();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
