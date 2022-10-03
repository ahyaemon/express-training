# express-training

わざと XSS 脆弱性のあるページを作り、セッションハイジャックを試す。

## 1. XSS で document.cookie をコンソールに表示する

攻撃者が以下の html をクエリパラメータに仕込んで、攻撃対象にクリックさせる。

```html
<svg onload="console.log(document.cookie)">
```

URL はこうなる

```
http://localhost:3000/search?search=%3Csvg+onload%3D%22console.log%28document.cookie%29%22%3E
```

cookie に http-only 属性が付与されていたため、javascript から読むことはできなかった。


## 2. XSS で「レモンをカートに入れる」リクエストを投げさせる

TODO
