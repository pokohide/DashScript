# お気に入り なくなる前に ワンスクリプト

![DashScript](https://github.com/hyde2able/DashScript/blob/master/resources/dash-script.jpg?raw=true)

## Dash Scriptとは?

コマンドを「かたっ」。お気に入りの商品が少なくなったと気づいたら、スクリプトを実行するだけで商品をお届けします。Wi-Fiに接続し、`.env`ファイルを設定するだけ。あとは必要な時にDash Scriptをお使いのPCで実行するだけで注文ができます。新しい買い物スタイルをご体験ください。

## 簡単セットアップ
Dash ScriptはWi-Fiに接続できるところであれば、どこでもお好きな場所でスクリプトを実行することができます。あとは必要な時にDash Scriptを実行するだけで注文ができます。

## ~~重複注文を防止~~
商品が届くまでスクリプトを何度実行しても一回分の注文のみ。とはいきません。全部届きます。ご注意下さい。Dash Scriptに関する責任は一切負いません。自己責任でお試しください。

## Dash Scriptは実質無料
Dash ScriptはGitHubから自分のローカルにダウンロードして、セットアップするだけで実質無料でお使いいただけます。

## プライム会員限定
* Dash Scriptはプライム会員のみお使いいただけます。
* 1ClickButtonを使用して購入をするので、事前に1ClickButtonを使用できるように設定を変更しておく必要があります。

## 使用方法

### 簡単セットアップ

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
`AMAZON_JP_ITEM_URL`には欲しい商品のURLを入力してください。

## ワンプッシュスクリプト

```
npm start
```
