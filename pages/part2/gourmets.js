// SSR(サーバーサイドレンダリング) --> サーバー側でデータ取得、htmlを組み立て返す。動的に変化しないデータ取得や初期表示に使う

import React, { useEffect } from 'react';
import getConfig from 'next/config';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// データ取得用の関数
const fetchShops = async (keyword, code) => {
  // next.config.jsからAPIキーを取得
  const { API_HOST } = getConfig().publicRuntimeConfig;

  // クエリを作成
  const query = new URLSearchParams();
  if (keyword) query.set('keyword', keyword);
  if (code) query.set('code', code);

  // ホストによってurlを変更（http(ローカルなど)なのにurlでhttpsを指定していたら繋がらないから）
  const host = process.browser ? '' : API_HOST;
  // APIキーが漏れないようにラッパー用API(/api/shops)を通して通信する
  const res = await fetch(`${host}/api/shops?${query.toString()}`);
  return await res.json();
};

// ジャンルを指定する用
const fetchGenres = async () => {
  const { API_HOST } = getConfig().publicRuntimeConfig;

  const host = process.browser ? '' : API_HOST;
  const res = await fetch(`${host}/api/genres`);
  return await res.json();
};

const Shops = ({ firstViewShops, genres }) => {
  const [keyword, setKeyword] = React.useState('');
  const [shops, setShops] = React.useState([]);

  // useEffect --> コンポーネントが再レンダリングされた後に指定した関数(この関数を『副作用』という)を処理する。
  // 副作用は、最初のレンダー時 + レンダリングするたびに呼ばれる(ここでは、初回 + 第２引数であるfirstViewShopsが更新されるたびに呼ばれる）
  // コンポーネント内(今回のshops)で書くことで、副作用内のstateにアクセスできる
  useEffect(() => {
    setShops(firstViewShops);
  }, [firstViewShops]);

  // 検索ボタンがクリックされた時
  const onSearchClick = async () => {
    // テキストフィールドのテキストに応じたデータを取得
    const data = await fetchShops(keyword, code);

    //setShopsによってshopsが更新されたので、再レンダリングされ、viewを再描画
    setShops(data);
    setKeyword('');
  };

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
        <FormControl fullWidth>
          <FormLabel id="genres">ジャンル</FormLabel>
          <RadioGroup row aria-labelledby="genres" name="genres">
            {genres.map((genre) => {
              return <FormControlLabel key={genre.id} value={genre.code} control={<Radio />} label={genre.name} />;
            })}
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          margin="normal"
          fullWidth
          onClick={() => {
            onSearchClick();
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
  // shopを取得
  const shops = await fetchShops(req.query.keyword, req.query.code);
  // genreを取得
  const genres = await fetchGenres();

  return {
    props: {
      firstViewShops: shops,
      genres,
    },
  };
};

export default Shops;
