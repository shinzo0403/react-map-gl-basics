export const markdown2 = [
  `
~~~tsx
import { Box } from '@mui/material';
import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { lib, mapConfig, mapStyle } from '../../utils/maps/MapConfig';

/** 画像を表示させるマーカー */
const markerStyle = {
  backgroundImage: 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  width: 70,
  height: 70,
};

const Prac2: React.FC = () => {
  return (
    <Box
      sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}
    >
      <Map {...mapStyle} {...mapConfig} initialViewState={{ bounds: lib }}>
        
        // 普通のマーカー
        <Marker longitude={139.733231} latitude={35.823026} />

        // 表示切り替え可能なマーカー
        {visible && (
          <Marker longitude={139.433231} latitude={35.623026} color={'red'} />
        )}

        // 画像を表示させるマーカー
        <Marker
          longitude={139.033231}
          latitude={35.723026}
          style={{ cursor: 'pointer' }}
        >
          <Box sx={markerStyle} />
        </Marker>

      </Map>
    </Box>
  );
};

export default Prac2;
`,

  0,

  '### マップのCSSプロパティと設定を別ファイルで格納する',

  'マーカーの前に、マップの基本情報を別ファイルに保存する方法を説明します。',

  `
~~~tsx:src/practice/prac_2/Prac2.tsx
<Map {...mapStyle} {...mapConfig} initialViewState={{ bounds: lib }}>
`,

  `
~~~tsx:src/utils/maps/MapConfig.tsx
import mapboxgl from 'mapbox-gl';

//マップの基本設定
export const mapConfig = {
  mapboxAccessToken: { AccessToken }
  mapStyle: { MapStyle },
  attributionControl: false,
};

//マップスタイル
export const mapStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
  cursor: 'grab',
  zIndex: -1,
};

//マップの基礎情報
export const lib = new mapboxgl.LngLatBounds([
  [139.533231, 35.409578],
  [139.912163, 36.023026],
]);
`,

  '`initialViewState`など、複数のマップで共通の設定をしたい際は`MapConfig`など別のファイルでJSON型で持っておいて、マップを描画する際にインポートして`スプレッド演算子`で展開する方法があります。いちいち個別に設定する必要がないのでおすすめです。',

  'ただし、下のように`Map`自体を別のファイルで持っておいて、カスタムマップとしてインポートすることはオススメできません。React-Map-GLは、`onMouseDown`などのマウスイベントが独自に設定されており、`((e: mapboxgl.MapLayerMouseEvent) => void) | undefined`という独自の型を持っています。カスタムマップのようにしてインポートすると逆に煩雑になるケースもあるので、状況によって使い分けるのが良いと思います。',

  `
~~~tsx
export const CustomMap: React.FC<CustomMapProps> = (props) => {
    const { children } = props

    return (
        <Map
          //共通の設定
        >

         { children }

        </Map>
    )
}
`,

  0,

  '### マーカーを刺す',

  '**①：基本的なマーカー**',

  `
~~~tsx
<Marker longitude={139.733231} latitude={35.823026} />
`,

  '最低限必要な情報は`longitude`と`latitude`のみです。デフォルトカラーは水色（？）なので、`color={好きな色}`で調整することができます。',

  0,

  '**②：表示切り替え可能なマーカー**',

  `
~~~tsx
{visible && (
    <Marker longitude={139.433231} latitude={35.623026} color={'red'} />
)}
`,

  '`visible`というboolean型の変数が`True`になった時のみ表示させることもできます。',

  0,

  '**③：画像を表示させるマーカー**',

  `
~~~tsx
/** 画像を表示させるマーカー */
const markerStyle = {
  backgroundImage: 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  width: 70,
  height: 70,
};

<Marker
  longitude={139.033231}
  latitude={35.723026}
  style={{ cursor: 'pointer' }}
>
    <Box sx={markerStyle} />
</Marker>
`,

  'ラッパーコンポーネントの形にして小要素に別のコンポーネントを入れることができます。今回は[Material-UI](https://mui.com/)の`Box`コンポーネントの`backgroundImage`で画像を表示してみました。',
];
