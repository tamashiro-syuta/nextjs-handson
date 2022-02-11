// next.js側に環境変数を取り込む設定

// VERCEL(デプロイで使うURL)とHOTPEPPER_API_KEY(APIキー)を定義し、.envから取得
const { VERCEL_URL, HOTPEPPER_API_KEY } = process.env;

module.exports = {
  reactStrictMode: true,
  // publicRuntimeConfig --> 基本的に漏れても良い設定値(ブラウザ側で利用するので漏れる)
  publicRuntimeConfig: {
    // VERCELのurlがあれば、そちらのurlに通信し、なければローカルに通信する
    API_HOST: VERCEL_URL ? `https://${VERCEL_URL}` : 'http://localhost:3000',
  },
  // serverRuntimeConfig --> 漏れてはいけないサーバー側で利用する値(APIキーなど)
  serverRuntimeConfig: {
    HOTPEPPER_API_KEY,
  },
};
