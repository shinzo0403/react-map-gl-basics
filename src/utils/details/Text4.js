export const markdown4 = [
  `
~~~tsx
import { Box } from '@mui/material';
import React from 'react';
import Map, { MapRef } from 'react-map-gl';
import { lib, mapConfig, mapStyle } from '../../utils/maps/MapConfig';
import ControlPanel, { inter_type } from './ControlPanel';

const Prac4: React.FC = () => {
  const [interaction, setInteraction] = React.useState<inter_type>({
    dragRotate: true,
    dragPan: true,
    doubleClickZoom: true,
    touchPitch: true,
    touchZoomRotate: true,
    scrollZoom: true,
  });

  const [map, setMap] = React.useState<MapRef | null>();

  const [fly, setFly] = React.useState(false);

  React.useEffect(() => {
    if (!map) return;
    map.flyTo({
      center: [
        Math.random() * 360 - 180,
        Math.random() * 180 - 90
      ],
      zoom: 3,
    });
  }, [fly]) 　//変数flyが変化する毎に発火

  const [cursor, setCursor] = React.useState<'grab' | 'grabbing'>('grab')  //カーソルアニメーション管理

  return (
    <Box
      sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}
    >

      //マップ制御
      <ControlPanel
        setInter={setInteraction}
        interState={interaction}
        setFly={setFly}
        fly={fly}
      />

      //マップ本体
      <Map
        {...mapStyle}
        {...mapConfig}
        initialViewState={{ bounds: lib }}
        ref={(r) => setMap(r)}

        {...interaction}  //インタラクションの設定をスプレッド演算子で埋め込む

        cursor={cursor}  //カーソルの表現
        onMouseDown={() => setCursor('grabbing')}
        onMouseUp={() => setCursor('grab')}
      />
    </Box>
  );
};

export default Prac4;
`,

  0,

  '### ドラッグ・タッチ・スクロール設定',

  '`<Map />`コンポーネントAPIでユーザーインタラクションを制御する際、個別に設定する場合と、`スプレッド演算子`でまとめて設定する場合があります。',

  `
~~~tsx

//個別設定
<Map
    dragRotate: false,
    dragPan: false,
    doubleClickZoom: false,
    touchPitch: false,
    touchZoomRotate: false,
    scrollZoom: false,
/>

//スプレッド演算子
const config = {
    dragRotate: false,
    dragPan: false,
    doubleClickZoom: false,
    touchPitch: false,
    touchZoomRotate: false,
    scrollZoom: false,
}

<Map
    {...config}
/>
`,

  '詳しくは[MapBox公式レファレンス](https://docs.mapbox.com/mapbox-gl-js/api/map/)をご参照ください。',

  0,

  '### TypeScriptとの併用',

  '基本的な型知識ですが、TypeScriptの`Read only`と`配列→ユニオン`の機能を使用して漏れなく実装することができます。',

  `
  ~~~tsx:src/practice/prac_4/ControlPanel.tsx
  //Read only オブジェクトを作成
  const inter_row = [
      'dragRotate',
      'dragPan',
      'doubleClickZoom',
      'touchPitch',
      'touchZoomRotate',
      'scrollZoom',
  ] as const 
  
  //スプレッド演算子で展開して、Read only 属性ではない（編集・操作可能な）配列を生成
  const inter_row_ty = [...inter_row]  
  
  //inter_row の文字要素をキーとした型を設定
  export type inter_type = {
      [T in typeof inter_row[number]]: boolean;
  } 
  
  ~~~
  `,

  `
  ~~~tsx:src/practice/prac_4/Prac4.tsx
  const [interaction, setInteraction] = React.useState<inter_type>({
    dragRotate: true,
    dragPan: true,
    doubleClickZoom: true,
    touchPitch: true,
    touchZoomRotate: true,
    scrollZoom: true,
  });

  ---

  <Map
    {...interaction}
/>
  `,

  '特定の機能のみ制限する場合は冗長ですが、ユーザーがマップ内で操作したり検索したりする際は、マップの機能制限をユーザーに委ねた方がUX的に良い場合があるので、その際に参考にしていただければと思います。',

  0,

  '### マップビュー操作',

  '任意の座標やズームレベルに移動する際は、`React-Map-GL`ではなく`mapbox-gl`のAPIを使用すると柔軟です。',

  '`map.flyTo()`をReactのuseEffect内で記述することで、任意の変数が変化した際にマップを動かす機能を実装することができます。',

  `
~~~tsx
//Mapインスタンスを格納
const [map, setMap] = React.useState<MapRef | null>();

//useEffectの依存関数用の変数
const [fly, setFly] = React.useState(false);

//flyTo機能
React.useEffect(() => {
  if (!map) return  //型ガード

  map.flyTo({
    center: [
      Math.random() * 360 - 180,
      Math.random() * 180 - 90
    ],
    zoom: 3,
  });

}, [fly]) 　//変数flyが変化する毎に発火

---

<Map
    ref={(r) => setMap(r)}
/>

`,

  '- mapインスタンスが格納される',

  '- flyの値が変化する際に',

  '- useEffectが発火、flyTo()実行',

  'という流れですね。Mapインスタンスを使用するとuseEffectを記述する回数がかなり増えるので、依存関数やコールバックループなど、気をつけなければならないことが増えてしまうのがネックになると思います。',

  0,

  '### マウスカーソル編集',

  'マウスカーソルなどのCSSスタイリングは、`<Map />`コンポーネント内の`style={}`内にて`CSSProperties`を定義することができますが、個別に`cursor`などで設定することもできます。',

  `
~~~tsx
const [cursor, setCursor] = React.useState<'grab' | 'grabbing'>('grab')  //カーソルアニメーション管理

<Map

    cursor={cursor}  //カーソルの表現
    onMouseDown={() => setCursor('grabbing')}
    onMouseUp={() => setCursor('grab')}

/>
`,
];
