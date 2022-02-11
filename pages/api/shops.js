// ラッパー用API
// フロント(ブラウザ)側でAPIへリクエストすることもできるが、APIキーが漏れてしまう(不正に利用の危険性)
// リクエストが必要な場合は、サーバー側でリクエストし、ブラウザに漏れないように実装する

import getConfig from 'next/config';

const shops = async (req, res) => {
  // next.config.jsのserverRuntimeConfigから、ホットペッパーのAPIキーを取得
  const { HOTPEPPER_API_KEY } = getConfig().serverRuntimeConfig;

  // APIに通信する用でクエリを作成
  const query = new URLSearchParams();
  query.set('key', HOTPEPPER_API_KEY);
  query.set('format', 'json');
  query.set('large_area', req.query.large_area || 'Z098'); //Z098は、沖縄
  if (req.query.keyword) query.set('keyword', req.query.keyword);
  if (req.query.code) query.set('genre', req.query.code);

  // レスポンスを取得
  const response = await fetch(`https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${query.toString()}`);
  // JSONに整形
  const data = await response.json();

  // 整形したデータから必要なもののみを返す(ここではshops)
  return res.json(data.results.shop);
};

export default shops;
