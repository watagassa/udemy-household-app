import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  //公式ドキュメントより、
  // TypeScript を使用している場合は、カスタム カラーにモジュール拡張を使用する必要があります。
  // パレットにカスタム カラーを追加するには、PaletteおよびPaletteOptionsインターフェースに追加する必要があります。
  
  //カスタムしたパレットカラーをインターフェースっで型指定
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;

  }
  //初期設定のような物 PaletteColorだとPaletteColorにあるすべてのプロパティを含めないといけない
  // ? はオプショナルという　これをつけるとincomeColorなどのinterfaceに追加したプロパティが任意になる
  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans Jp, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  //paleteMUI
  // main: 色の主な色合い
  // light: より明るい色合いmain
  // dark: より暗い色合いmain
  // contrastText: テキストの色。main
  palette: {
    
    //収入用の色を定義
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },
    //支出用の色を定義
    expenseColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
    },
    //残高用の色を定義
    balanceColor: {
      main: green[500],
      light: green[100],
      dark: green[700],
    },
  },
});
