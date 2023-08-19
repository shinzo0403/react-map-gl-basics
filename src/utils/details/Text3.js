import image1 from '../../assets/images/MapLayerEvent.png';
import gif1 from '../../assets/images/PopupOnMouseLeave.gif';

export const markdown3 = [
  `
~~~tsx
import { Box, Stack } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import Map, { Popup } from 'react-map-gl';
import { lib, mapConfig, mapStyle } from '../../utils/maps/MapConfig';

const Prac3: React.FC = () => {
  const [lnglat, setLnglat] = React.useState<mapboxgl.LngLat | null>(
      new mapboxgl.LngLat(138.533231, 35.723026)
  );

  return (
    <Box
      sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}
      onMouseLeave={() => setLnglat(null)} //コンテナ側でonMouseLeaveを設定する
    >
      <Map
        {...mapStyle}
        {...mapConfig}
        initialViewState={{ bounds: lib }}
        onMouseMove={(e) => setLnglat(e.lngLat)}  //マップイベントを格納
      >

        // 普通のポップアップ
        <Popup longitude={139.933231} latitude={35.723026}>
          普通のポップアップ
        </Popup>

        // 閉じるボタンなし
        <Popup
          longitude={139.333231}
          latitude={35.723026}
          closeButton={false}
          closeOnClick={false}
        >
          閉じるボタンなし
        </Popup>

        // マウス操作に合わせたポップアップ
        {lnglat && (
          <Popup
            longitude={lnglat.lng}
            latitude={lnglat.lat}
            closeButton={false}
            closeOnClick={false}
          >
            <Stack direction={'column'} spacing={1} sx={{ height: '100%' }}>
            <Typography fontSize={'10px'} fontWeight={'bold'}>
                マウス操作に合わせたポップアップ
            </Typography>
            <Typography fontSize={'10px'}>
                longitude: {lnglat.lng.toFixed(3)}
            </Typography>
            <Typography fontSize={'10px'}>
                latitude: {lnglat.lat.toFixed(3)}
            </Typography>
            </Stack>
          </Popup>
        )}

      </Map>
    </Box>
  );
};

export default Prac3;
`,
  0,
  '### ポップアップの基本コード',

  `
~~~tsx
<Popup
  longitude={139.333231}
  latitude={35.723026}
  closeButton={false}  //閉じるボタンを設定する？
  closeOnClick={false}  //マップをクリックしたら自動で閉じる？
>
    //中身
</Popup>
`,

  '`Mapbox GL JS`とは異なり、上のようにダイアグラムコードに書き込みます。必須の情報は`緯度・経度`のみで、追加で色々な設定を使え加えることができます。もちろんスタイリングも`style?: React.CSSProperties`で自由に変えることができます。',

  '※ `Mapbox GL JS`ではポップアップの中身は`setHTML()`で設定しますが、`React-Map-GL`ではコンポーネントの子要素に記述します。',

  0,

  '### マウスイベントの取得',

  'マウスカーソルに合わせてポップアップを表示するには、`onMouseMove`でカーソルの座標を獲得しなければなりません。しかしながら「[指定した場所にマーカーを設置する](/practice2)」で説明した通り、`MapBox-GL`のマウスイベントは独自の属性(`((e: mapboxgl.MapLayerMouseEvent) => void) | undefined`)を持っているので、useStateなどでプロパティを格納するには専用の型を設定しなければなりません。',

  `![](${image1})`,

  '上のスクショは、',

  `
~~~tsx
onClick={(e) => console.log(e)}
`,

  'でコンソールにマウスイベントを表示したものです。「[マップにレイヤーを追加して、線やポリゴンを表示する](/practice5)」でも再度説明しますが、デフォルトのマウスイベントに`MapLayerMouseEvent`が追加されることで、カーソルのマップ情報を取得することができます。',

  '今回取得するのは`(parameter) e: mapboxgl.MapLayerMouseEvent.lngLat`です。これを',

  `
~~~tsx
const [lnglat, setLnglat] = React.useState<mapboxgl.LngLat | null>(
    new mapboxgl.LngLat(138.533231, 35.723026)
);
`,

  'に格納したのち`<Popup />`の緯度・経度に渡すことで、カーソルにポップアップを表示することができます。',

  '重要なのは、`<mapboxgl.LngLat | null>`とuseStateに型を指定することです。基本的に無くても問題ありませんが、後に`GeojsonProperties`を格納する際にエラーが生じるため、ここで`MapBox-GL`専用の型をつける癖をつけてしまいましょう。',

  0,

  '### さらにアップデート',

  'これでカーソルにポップアップを表示させることができましたが、このままでは下のようにポップアップが残ってしまいます。',

  `![](${gif1})`,

  'したがって、マップ自体、もしくはマップを格納するコンテナで（今回の例では`<Box />`）ポップアップを消さなければなりません。',

  `
~~~tsx
const [lnglat, setLnglat] = React.useState<mapboxgl.LngLat | null>(
    new mapboxgl.LngLat(138.533231, 35.723026)
);

     ~~~

return (
    <Box
      sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}
      onMouseLeave={() => setLnglat(null)} //コンテナ側でonMouseLeaveを設定する
    >
      <Map
        {...mapStyle}
        {...mapConfig}
        initialViewState={{ bounds: lib }}
        onMouseMove={(e) => setLnglat(e.lngLat)}  //マップイベントを格納
      >

      ~~~

      {lnglat && (
        <Popup
          longitude={lnglat.lng}
          latitude={lnglat.lat}
          closeButton={false}
          closeOnClick={false}
        >
`,

  '- useStateの型設定に`null`を追加する',

  '- マップ、もしくはマップを格納しているコンテナで`onMouseLeave={() => setLngLat(null)}`を設定し、マウスがコンテナ外に出た際に緯度・経度を空にする',

  '- ポップアップを`lnglat`が`null`でない（＝座標が格納されている）時のみ表示するように改良',

  'このステップで先程の問題を修正することができます。',

  0,

  'このように、マウスイベントは`mapboxgl.MapLayerMouseEvent`という独自の属性を持っているため、実装の際は少し気を配らなければなりません。',

  '※ 詳細は[Mapbox GL JS公式ドキュメント](https://docs.mapbox.com/mapbox-gl-js/api/events/)から確認することができます。',
];
