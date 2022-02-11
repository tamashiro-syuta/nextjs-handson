// SSR(サーバーサイドレンダリング) --> サーバー側でデータ取得、htmlを組み立て返す。動的に変化しないデータ取得や初期表示に使う

import React from 'react';
import getConfig from 'next/config';

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
  return (
    <ul>
      {/* 取得したデータの数だけリストを作成 */}
      {shops.map((shop) => {
        return <li key={shop.id}>{shop.name}</li>;
      })}
    </ul>
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
