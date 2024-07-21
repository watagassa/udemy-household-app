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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { error } from "console";
import { format } from "date-fns";
import { formatMonth } from "./utils/formatting";
import { Schema } from "./validations/schema";

function App() {
  //型ガードはbooleanを返す
  //TSの型ガードを使用　型によって処理を変える  　errが{code:string,message:string} の型だったときに「true」を返す
  function isFireStoreError(
    err: unknown
  ): err is { code: string; message: string } {
    return typeof err === "object" && err !== null && "code" in err;
  }
  //firebaseのデータを保持するためのuseState typesの中のTransaction型を使用
  //取引の記録を保存する
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  //useState<Date>がなくとも、TSの型推論でエラーが出ていない
  const [currentMonth, setCurrentMonth] = useState(new Date());

  //date-fnsのformat Year Month Dayの順で書く
  //format(currentMonth,"yyyy-MM");
  //初回レンダリング時のみ（最後の引数の[]が空）
  //async functionは呼び出されるとPromiseを返す。
  //console.log(transactions);
  useEffect(() => {
    //useEffectにasyncがつけられないために作った関数
    const fecheTransaction = async () => {
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
          } as Transaction;
        });
        console.log(transactionsData);
        setTransactions(transactionsData);
        //errがfirebaseのものか普通のものかを判断したい
      } catch (err) {
        //errにcodeとmessageがある場合はfirebaseのerr
        //
        if (isFireStoreError(err)) {
          // json形式　json形式のもの , 細かいルールを関数で指定, インデントで字を２スペース開ける
          //console.error(JSON.stringify(err,null,2));
          console.error("firestoreのエラー", err);
          // console.error("エラーメッセージ",err.message);
          // console.error("エラーコード"+err.code);
        } else {
          console.error("一般的なエラー", err);
        }
      }
    };
    fecheTransaction();
  }, []);

  //ひと月ごとのデータを取得
  const monthlyTransactions = transactions.filter((transaction) => {
    // transactionには取引データが入っている
    //　startsWith() は.の前の文字列が引数で始まっているかどうかでtrue falseを返す
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  //取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    //非同期で行う
    try {
      //firebaseに保存する処理
      //addDocはCloud Firestore によって ID が自動的に生成
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);
      //新しく値が保存されたときに、画面に即反映させるための関数
      const newTransaction = {
        id: docRef.id,
        ...transaction,
        //category:dsana,
        //type:sags,
        //といったふうにオブジェクトの中身を展開するのと同じ

        // newTransactionの型を型アサーションで
      } as Transaction;
      //推奨していない setTransactions([...transactions,newTransaction]);
      //prevTransactionsには前回のデータが入っている
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]); //推奨
    } catch (err) {
      //errにcodeとmessageがある場合はfirebaseのerr
      //
      if (isFireStoreError(err)) {
        // json形式　json形式のもの , 細かいルールを関数で指定, インデントで字を２スペース開ける
        //console.error(JSON.stringify(err,null,2));
        console.error("firestoreのエラー", err);
        // console.error("エラーメッセージ",err.message);
        // console.error("エラーコード"+err.code);
      } else {
        console.error("一般的なエラー", err);
      }
    }
  };
  //取引を削除する処理
  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      //firestoreのデータを削除
      await deleteDoc(doc(db, "Transactions", transactionId));
      //リロードせずとも削除を反映させるための処理
      const filterdTransactions = transactions.filter(
        (transaciton) => transaciton.id !== transactionId
      );
      setTransactions(filterdTransactions);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firestoreのエラー", err);
      } else {
        console.error("一般的なエラー", err);
      }
    }
  };
  //取引を更新する処理
  const handleUpdateTransaction = async (
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      //firestore更新処理
      //更新対象を取得
      const docRef = doc(db, "Transactions", transactionId);
      //更新する
      await updateDoc(docRef, transaction);

      //フロント更新 transactions Stateをマップ関数で展開、変更する
      const updatedTransacitons = transactions.map((t) =>
        t.id === transactionId ? { ...t, ...transaction } : t
      ) as Transaction[];
      setTransactions(updatedTransacitons);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("firestoreのエラー", err);
      } else {
        console.error("一般的なエラー", err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route path="/report" element={<Report 
            currentMonth = {currentMonth}
            setCurrentMonth={setCurrentMonth}
            />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
