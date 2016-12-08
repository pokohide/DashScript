## DashScript

一回実行するだけで欲しい商品を買ってしまうスクリプトです。

## Setup

```
brew install phantomjs
npm install
```

`.env.sample`を参考に`.env`ファイルを作成してください。

```
AMAZON_JP_EMAIL=mail@example.com
AMAZON_JP_PASSWORD=password
AMAZON_JP_ITEM_URL=http://www.amazon.co.jp/dp/XXXXXXXXX
PRODUCTION=false
```

`PRODUCTION`は`false`のままで大丈夫です。
`AMAZON_JP_ITEM_URL`は欲しい商品のURLを入力してください。

## 実行方法

```
npm start
```
