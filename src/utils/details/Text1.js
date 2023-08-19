import image2 from '../../assets/images/MapRef.png';
import image1 from '../../assets/images/SetBounds.png';
import { introTexts } from '../introduction/IntroTexts';

export const markdown1 = [
  `
~~~tsx
import { Box } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';  //上の階層でimportしている場合は必要ありません
import React from 'react';
import Map, { Marker } from 'react-map-gl';

//マップの基礎情報
const lib = new mapboxgl.LngLatBounds([
  [139.533231, 35.409578],
  [139.912163, 36.023026],
]);

//MapboxGLのアクセストークン
const myMapToken = { AccessToken }

//MapBoxStudioで得られるマップスタイルURL
const myMapStyle = { MapStyle }

//本体
const Prac1: React.FC = () => {
  return (

    // マップコンテナを収納するコンテナ
    <Box sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}>
    
      // マップ本体
      <Map
        mapboxAccessToken={myMapToken}
        mapStyle={myMapStyle}
        initialViewState={{ bounds: lib }}
      >

    </Box>
  );
};
~~~
`,

  'このセクションでは、簡易的なマップを生成するまでの工程を学ぶことができます。最低限必要なのは`return`以下DOMなので、下から上に分解していきます。',

  0,

  '### Map本体',

  `
~~~tsx
// マップ本体
<Map
  mapboxAccessToken={myMapToken}
  mapStyle={myMapStyle}
  initialViewState={{ bounds: lib }}
>
`,

  'マップ生成に必要な項目は、`mapboxAccessToken`、`mapStyle`、`initialViewState`の三種類です。前の二つは「事前準備」で用意したアクセストークンとマップスタイルのURLを埋め込みます。',

  '`initialViewState`は、中心点(`center`)と初期ズーム値(`zoom`)の組み合わせか、x軸とy軸の最大・最小地点(`bounds`)の二つの方法で表現することができます。今回は、`mapbox.LngLatBounds`によって配列をマップで使えるように型を加工しました。',

  '※ `bounds`は少し特殊な表示の仕方がされます。ページトップのBoundsボタンを押すとx軸とy軸の最大・最小地点のマーカーが表示されますが、横方向にマップが引き伸ばされていることがわかります。より複雑な機能を追加していくと、このことがネックになる場合があります。',

  0,

  '### initialViewStateの設定',

  '次に`bounds`に格納する定数を作成していきます。`mapboxgl.LngLatBounds(number[][])`で`lib`という定数を作成します。',

  `![](${image1})`,

  'アノテーションを表示すると、`number[][]`から`mapboxgl.LngLatBounds`というMapbox GL JS独自の型に変更されていることがわかります。直接配列を埋め込むこともできますが、`TypeSctipt`を使用する際は、型を変更してから代入したほうが後々便利です。',

  '他の設定はMapbox GL JSの[APIレファレンス](https://docs.mapbox.com/mapbox-gl-js/api/map/)を参照することで確認できます。',

  '※ ユーザーにマップを動かして欲しくない場合は、下のように`mapConfig`という定数を作成し、`Map`コンポーネントに`スプレッド演算子`で設定を追加します。',

  `
~~~tsx
const mapConfig = {
  dragRotate: false,
  dragPan: false,
  doubleClickZoom: false,
  touchPitch: false,
  touchZoomRotate: false,
  scrollZoom: false,
  cursor: 'default',
}

~~

<Map
  mapboxAccessToken={myMapToken}
  mapStyle={myMapStyle}
  initialViewState={{ bounds: lib }}

  {...mapConfig}  //ココ
>
`,

  '一時的に操作可能にしたい場合は、`{...mapConfig, doubleClickZoom: true}`のように上書きをすることで対処できます。直接追加しても良いですが、DOMが長くなってしまうのでimportエリアのすぐ下に書いてしまうのが良いと思います。',

  `詳しくは[${introTexts[4].h}](/practice4)をご参照ください。`,

  0,

  '### Mapbox GL JSの機能を使うには',

  'ちなみに、さまざまなExampleを[Mapbox GL JSの公式ページ](https://docs.mapbox.com/mapbox-gl-js/example/)で確認することができますが、全てMapbox GL JS + HTML + JSで構成されているためReactでコーディングするのに一苦労かかります。',

  '例えば下のようにMapbox GL JSでは`map = new mapboxgl.Map`で`mapboxgl.Map`型のRefインスタンスを生成し、`map.{function}`でさまざまな機能を追加していきます。',

  `![](${image2})`,

  'しかし、React-Map-GLの記法では、DOM内で全て完結するためRefインスタンスを書く必要がありません。したがって、追加でRefインスタンスを獲得する必要があります。',

  0,

  '#### 1. useMap()フックで取り出す',

  '`React-Map-GL`のAPIに、CurrentのMapインスタンスを取り出す`useMap()`フックが存在します。',

  '使用する場合は、マップコンポーネントを`<MapProvider>`でラップします。',

  `
~~~tsx
import Map, { useMap } from 'react-map-gl'  // 事前にuseMapをimportする必要があります

const Prac1: React.FC = () => {

  const { current: map } = useMap()  // ココでRefインスタンスを格納します

  return (

    // マップコンテナを収納するコンテナ
    <Box sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}>
    
      // マップ本体
      <Map
        mapboxAccessToken={myMapToken}
        mapStyle={myMapStyle}
        initialViewState={{ bounds: lib }}
      >

    </Box>
  );
};

~~~
`,
  0,

  '#### 2. useState()フックで取り出す',

  'マップコンポーネントを`<MapProvider>`でラップしない場合、`useMap()`で取り出すことができません。その場合は、`<Map />`コンポーネントのAPIにある`ref`をuseStateに格納します。',

  `
~~~tsx
import Map, { MapRef } from 'react-map-gl'  // 事前にMapRefの型をimportする必要があります

const Prac1: React.FC = () => {

  const [map, setMap] = React.useState<MapRef | null>()  // ココでRefインスタンスをuseStateで格納します

  React.useEffect(() => {
    if (!map) return;  // nullを型ガード

    // その後の機能追加

  }, [map])  // useEffectでmapを依存関数に渡し、Refインスタンスがloadされたタイミングで発火し、機能を追加します

  return (

    // マップコンテナを収納するコンテナ
    <Box sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}>
    
      // マップ本体
      <Map
        mapboxAccessToken={myMapToken}
        mapStyle={myMapStyle}
        initialViewState={{ bounds: lib }}

        ref={(ref) => setMap(ref)}  //生成されたRefインスタンスを格納します
      >

    </Box>
  );
};
`,

  '`ref={(ref) => setMap(ref)}`で生成されたRefインスタンスを`ref`に渡し、useState変数に格納しています。',

  'ただし、`addLayer`、`addSource`、`setPopup`などの基本的な機能はダイアグラムコードで記述することができるので、基本的には使いません。（`loadImage`や`flyTo`などは必要です）',

  0,

  'これで基本的なマップを生成することができました。',
];
