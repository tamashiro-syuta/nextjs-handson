// SSR(サーバーサイドレンダリング) --> サーバー側でデータ取得、htmlを組み立て返す。動的に変化しないデータ取得や初期表示に使う

import React from 'react';
import getConfig from 'next/config';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// データ取得用の関数
const fetchData = async (keyword) => {
  // next.config.jsからAPIキーを取得
  const { API_HOST } = getConfig().publicRuntimeConfig;

  // クエリを作成
  const query = new URLSearchParams();
  if (keyword) query.set('keyword', keyword);

  // ホストによってurlを変更（http(ローカルなど)なのにurlでhttpsを指定していたら繋がらないから）
  const host = process.browser ? '' : API_HOST;
  // APIキーが漏れないようにラッパー用API(/api/shops)を通して通信する
  const res = await fetch(`${host}/api/shops?${query.toString()}`);
  return await res.json();
};

const Shops = ({ shops }) => {
  const [keyword, setKeyword] = React.useState('');

  return (
    <Container component="main" maxWidth="md">
      {/* 検索フォーム */}
      <Box
        component="form"
        noValidate
        maxWidth="md"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          label="キーワードを入力してください"
          variant="standard"
          margin="normal"
          fullWidth
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />
        <Button
          variant="contained"
          margin="normal"
          fullWidth
          onClick={() => {
            setKeyword('');
          }}
        >
          検索
        </Button>
      </Box>

      {/* リスト表示 */}
      <Box
        component="from"
        noValidate
        sx={{
          marginTop: 8,
          display: 'flex',
        }}
        alignItems="center"
        justify="center"
      />
      <List>
        {shops.map((shop) => {
          return (
            <ListItem key={shop.id}>
              <ListItemButton
                onClick={() => {
                  // shopの詳細へ
                  console.log('click!!!');
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={shop.name} src={shop.logo_image} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${shop.genre.name} ${shop.name}`}
                  secondary={
                    <>
                      <Typography variant="body1" component="span">
                        {`${shop.catch} ${shop.shop_detail_memo}`}
                      </Typography>
                      <Typography variant="caption">{shop.address}</Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

// 上のShopsに引数を渡している
export const getServerSideProps = async (req) => {
  const data = await fetchData(req.query.keyword);

  return {
    props: {
      shops: data,
    },
  };
};

export default Shops;
