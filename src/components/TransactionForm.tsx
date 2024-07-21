import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ExpenseCategory, IncomeCategory, Transaction } from "../types";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import SavingsIcon from "@mui/icons-material/Savings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from "../validations/schema";
import { Category } from "@mui/icons-material";

interface TransactionFormProps {
  //戻り値voidの関数
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>
  onDeleteTransaction: (transactionId: string) => Promise<void>
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>
}

type IncomeExpense = "income" | "expense";
interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
  setSelectedTransaction,
  onDeleteTransaction,
  onUpdateTransaction,

}: TransactionFormProps) => {
  const formWidth = 320;
  //controlをJSX内で使えるようにする処理 初期値も決めている
  //react-hook-formで使うものを入れている
  // 支出用カテゴリ
  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <AlarmIcon fontSize="small" /> },
    { label: "住居費", icon: <AddHomeIcon fontSize="small" /> },
    { label: "交際費", icon: <Diversity3Icon fontSize="small" /> },
    { label: "娯楽", icon: <SportsTennisIcon fontSize="small" /> },
    { label: "交通費", icon: <TrainIcon fontSize="small" /> },
  ];

  // 収入用カテゴリ
  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <WorkIcon fontSize="small" /> },
    { label: "副収入", icon: <AddBusinessIcon fontSize="small" /> },
    { label: "お小遣い", icon: <SavingsIcon fontSize="small" /> },
  ];

  const [categories, setCategories] = useState(expenseCategories);
  //フォームに入力される型はSchema
  // type Schema = {
  //     type: "income" | "expense";
  //     date: string;
  //     amount: number;
  //     content: string;
  //     category:""| "副収入" | "お小遣い" | "給与" | "食費" | "日用品" | "住居費" | "交際費" | "娯楽" | "交通費";
  // }

  const {
    control,
    setValue,
    watch,
    formState: { errors },
    //保存時の処理
    handleSubmit,
    //リセットしたい時に使う関数
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
    //zodのバリテーションチェックをreact-hooks-formと連携
    resolver: zodResolver(transactionSchema),
  });

  const incomeExpenseToggle = (type: IncomeExpense) => {
    //{ control ,setValue}で作ったsetValueを使う
    //defaultValuesで指定した"type"にtypeをセット
    setValue("type", type);
  };

  console.log(errors);

  //typeの値を監視
  const currentType = watch("type");
  //収支タイプを切り替える関数
  //currentDayの値が変わる＝日付をクリックしたとき
  //dateをcurrentDayにする
  //useEffectを使ってリアルタイムでdateを変更する
  useEffect(() => {
    setValue("date", currentDay);
    setValue("category", "");
  }, [currentDay]);

  //収支タイプに応じたカテゴリを取得
  useEffect(() => {
    const newCategories =
      currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories);
  }, [currentType]);

  //選択肢が更新されたか確認
  useEffect(()=>{
    if(selectedTransaction){
      const categoryExist =
      //some関数は配列の要素が一つでも条件に合っていればtrueを返す
      categories.some((category) => category.label === selectedTransaction?.category)
      setValue("category",categoryExist ? selectedTransaction.category : "");
    }

  },[selectedTransaction,categories])
  //  送信処理
  //schema.jsで作ったdataの型指定を使用 :SubmitHandler<Schema>が推奨されているが、(data:Schema)でもいい
  const onsubmit: SubmitHandler<Schema> = (data) => {

    console.log(data);
    if(selectedTransaction){
      onUpdateTransaction(data, selectedTransaction.id)
      .then(() => {
        // console.log("更新しました")
        setSelectedTransaction(null);
      }).catch((error) => {
        console.error(error);
      });

    } else{
      onSaveTransaction(data)
      .then(() => {
        console.log("保存しました")
      }).catch((error) => {
        console.error(error);
      });

    }
    //reset();のみだとdefaultvalueの値が入る
    //defaultvalueの値は保持されてしまうため、date: currentDay,
    //としていても初期値の今日の日付でリセットされる
    //{}で囲み、オブジェクトとして書く
    reset({
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    });
  };

  useEffect(() => {
    //selectedTransactionがnullでない場合
    if (selectedTransaction) {
      setValue("type", selectedTransaction.type);
      setValue("date", selectedTransaction.date);
      setValue("amount", selectedTransaction.amount);
      setValue("category", selectedTransaction.category);
      setValue("content", selectedTransaction.content);
    } else {
      reset({
        type: "expense",
        date: currentDay,
        amount: 0,
        category: "",
        content: "",
      });
    }
  }, [selectedTransaction]);

  const handleDelete = () => {
    if(selectedTransaction){
      onDeleteTransaction(selectedTransaction.id);
      //取引の選択が解除され、nullが入るため、フォーム内容がまっさらになる
      setSelectedTransaction(null);
    }

  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          // 閉じるバツボタンを押した時に
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      {/* onSubmitは送信処理 handleSubmit(onsubmit)でバリテーションチェックが通った時のみ実行*/}
      <Box component={"form"} onSubmit={handleSubmit(onsubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => {
              return (
                <ButtonGroup fullWidth>
                  <Button
                    // variantではボタンを強調表示、非強調表示することができる
                    variant={
                      field.value === "expense" ? "contained" : "outlined"
                    }
                    color="error"
                    onClick={() => incomeExpenseToggle("expense")}
                  >
                    支出
                  </Button>
                  <Button
                    //ddefaultでプライマリなのであってもなくても
                    color={"primary"}
                    onClick={() => incomeExpenseToggle("income")}
                    variant={
                      field.value === "income" ? "contained" : "outlined"
                    }
                  >
                    収入
                  </Button>
                </ButtonGroup>
              );
            }}
          />
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                //エラーの中にdateプロパティが存在するならtrue
                //errors.dateのみではboolean型でなく、dateの値が入る
                //!!で反転させずにboolean型に変換
                error={!!errors.date}
                //?はmessageがなかったらやらなくていいよってやつ
                //errors.dateはきちんとした値が入っていたら存在しない
                helperText={errors.date?.message}
              />
            )}
          />

          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  id="カテゴリ"
                  label="カテゴリ"
                  select
                >
                  {categories.map((category, index) => (
                    //カテゴリごとに
                    <MenuItem value={category.label} key={index}>
                      <ListItemIcon>{category.icon}</ListItemIcon>
                      {category.label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.amount}
                //?はmessageがなかったらやらなくていいよってやつ
                //errors.dateはきちんとした値が入っていたら存在しない
                helperText={errors.amount?.message}
                {...field}
                //入力されている値が0ならば""にする
                value={field.value === 0 ? "" : field.value}
                //入力された際に文字列からintにしてフィールドに保存
                onChange={(e) => {
                  //Nanだったときは０を入れる  10進数で
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
              />
            )}
          />

          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field}
                label="内容"
                type="text"
              />
            )}
          />

          {/* 保存ボタン */}
          {/* MUIにある"primary" : "error"の色を使って保存ボタンの色を変更 */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            {selectedTransaction ? "更新" :"保存"}
          </Button>
          {/* 削除ボタン */}
          {/* selectedTransactionがnullでない場合()内の処理を実行 */}
          {selectedTransaction && (
            <Button
              onClick={handleDelete} 
              variant="outlined"
              color={"secondary"}
              fullWidth
            >
              削除
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
