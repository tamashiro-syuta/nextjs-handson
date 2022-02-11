// 共通レイアウトを定義する場所なので、作成したテーマが全てのページに反映される

import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from '../styles/theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js HandsOn</title>
      </Head>
      {/* 配下にthemeのスタイルを反映させる */}
      <ThemeProvider theme={theme}>
        {/* CssBaseLineは、デフォルトCSS(各ブラウザが固有で持ってるCSS)を打ち消して、MUI側で良い感じにしてくれる */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
