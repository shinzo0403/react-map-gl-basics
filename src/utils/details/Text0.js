import image2 from '../../assets/images/Mapbox_Studio.png';
import image1 from '../../assets/images/Missing_CSS_Declare.png';

export const markdown0 = [
  '### インストール',

  `
まず最初に、[Mapbox GL JS](https://docs.mapbox.com/jp/help/tutorials/use-mapbox-gl-js-with-react/)と[React-Map-GL](https://visgl.github.io/react-map-gl/)をインストールします。
Mapbox GL JSのみでもマップを記述する方法はありますが（現在はこちらがスタンダード）、筆者はよりReactチックなコーディングを可能にしてくれるReact-Map-GLを併用しています。
`,

  `
~~~tsx
npm i mapbox-gl react-map-gl
~~~
`,
  0,

  '### 描画するためのCSSファイルをインポート',

  `マップをコーディングする前に、MapBox-GLでマップを表示させるためのタイルセットのCSSファイルをインストールしておきます。`,

  `
~~~html:public/index.html
<!DOCTYPE html>
<html lang="ja">
<head>

// ココ
<link
  href="https://api.tiles.mapbox.com/mapbox-gl-js/v{インストールしたMapBox-GLのバージョン}/mapbox-gl.css"
  rel="stylesheet"
/>

</head>

<body>
  //本体
</body>
　</html>
`,

  '※ React側でインポートしても良いです',

  `
~~~tsx:src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store/slices/store';

// ココ
import 'mapbox-gl/dist/mapbox-gl.css';
`,

  'これで`index.tsx`より下の階層のファイルでmapbox-glを使用することができるようになりました。',

  `![](${image1})`,

  `↑ CSSがないと、ローカルサーバーのコンソールで怒られてしまいます。`,

  0,

  '### マップの初期スタイリング',

  '次にマップのスタイリングを行います。[Mapbox Studio](https://www.mapbox.com/mapbox-studio)のStylesに進み、`New Styles`から新しいマップスタイルを生成します。エディタに移動したら、道路や水の色を好きに変更したのち、右上の`Share`ボタンをクリックします。下のようなモーダルが出てくるので、`Style URL`と`Access Token`をコピーします。',

  `![](${image2})`,

  '`Access Token`は有料アカウントのみに配布されるものなので、外部に漏らさないように気をつけましょう。',

  'これで下準備が完了しました。',
];
