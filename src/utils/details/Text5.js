import image1 from '../../assets/images/MapExpression.png';
import image3 from '../../assets/images/TileLayer.png';
import image2 from '../../assets/images/Tileset.png';

export const markdown5 = [
  `
~~~tsx
//Geojsonデータ
<Source id={source_id} type='geojson' data={my_data}>

　　<Layer 
　　　　id={layer_id}
　　　　type='fill' 
　　　　paint={{
        'fill-color': 'blue',
        'fill-opacity': 0.9
    }} 
　　/>

</Source>

//ラスタタイル
<Source id={source_id} type='raster' tiles=[url1, url2, ...] tileSize={256} >

　　<Layer 
　　　　id={layer_id}
　　　　type='raster'
　　/>

</Source>

//ベクタタイル
<Source id={source_id} type='vector' url={ 'mapbox://{tilesetId}' } >

　　<Layer 
        id={layer_id}
        type='fill' 
        source-layer={sourceLayer}
        paint={{
            'fill-color': 'blue',
            'fill-opacity': 0.9
        }} 
　　/>

</Source>

`,

  'レイヤーはかなりボリュームがあるので、いくつかの機能に分けて解説していきます。`Mapbox GL JS`とJavaScript+HTMLを用いる方法には触れないので、[Mapbox GL JS公式レファレンス](https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/)をご参考ください。',

  '### 基本構造',

  'まずは`React-Map-GL`における基本的なレイヤー追加方法です。',

  0,

  '#### ① Geojsonデータを直接埋め込む',

  'geojsonの型についてさっぱりわからないという方は、[GIS教材ページ](https://gis-oer.github.io/gitbook/book/materials/web_gis/GeoJSON/GeoJSON.html#geojosn%E3%81%A8%E3%81%AF)から基礎的なことを学ぶことができます。',

  'ざっくり説明すると、下のような形をとるデータのことを言います。',

  `
~~~tsx

{
    type: 'FeatureCollection,
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: []  //座標
            },
            properties: {
                
            }
        }
    ]
}

`,

  '「座標の集まり(`geometry`)に特性(`properties`)を紐付けた特徴物(`Feature`)を束ねたデータ群(`FeatureCollection`)」という感じですね。',

  '次に実装方法ですが、下のコードがオーソドックスな実装です。',

  `~~~tsx
<Source id={source_id} type='geojson' data={my_data}>

　　<Layer 
　　　　id={layer_id}
　　　　type='fill' 
　　　　paint={{
        'fill-color': 'blue',
        'fill-opacity': 0.9
    }} 
　　/>

</Source>
`,

  'レイヤーは`Source`と`Layer`の二つに分かれています。イメージとしては、「Sourceでデータをロードして、Layerで描画する」という感じでしょうか。`React-Map-GL`では`<Source />`で`<Layer />`をラッピングすることで実装することができます。',

  'Sourceに必要なプロパティは',

  '- `id`: Sourceのアイデンティティを決める文字列です。任意の文字列で構いませんが、管理しやすいものにしたほうが良いと思います。',

  '- `type`: 読み込むデータタイプです。今回のケースでは`geojson`データであることをプログラムに伝えます。',

  '- `data`: データ本体です。',

  'の三点です。',

  '注意しなければならないのは、`data`のタイプは必ず`FeatureCollection<Geometry, GeoJsonProperties>`でなければならないということです。`any`型だとエラーになってしまいます。[ポップアップを操作する](/practice3)でも伝えたように、型にはかなり敏感になる必要があります。',

  'この型はライブラリからインポートしなければならない場合があります。大抵の型は`geojson`というライブラリにあるので、まずはそこから探してみてください。',

  `
~~~tsx
import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
`,

  'Layerに必要なプロパティは',

  '- `id`: Source同様、識別するための文字列です。',

  '- `type`: レイヤーの形を決めるためのプロパティです。点(`circle`)や線(`line`)、ポリゴン(`fill`, `fill-extrusion`)などがそれにあたります。',

  '- `paint`: レイヤーの色や形を決めるためのプロパティです。',

  'の3つさえ押さえてしまえば大丈夫です。',

  '一番厄介なのは`paint`で、様々な表現を覚えなければなりません。',

  '1. 単色',

  `
  ~~~tsx
  'fill-color': 'red'

  `,

  '2. geojsonのプロパティに色が設定してある場合',

  `
  ~~~tsx
  'fill-color': ['get', 'プロパティのキー名']
  `,

  '3. プロパティに依存したグラデーションを作りたい場合',

  `
  ~~~tsx
  'fill-color': [
    'match',
    ['get', 'id'],
    'スーパー',
    'violet',
    '学校',
    'gray',
    '駅',
    'blue',
    '公園',
    'lightgreen',
    '#ccc',  //その他
  ]
    `,

  '2、3は何を意味しているか謎に見えますが、これは`Mapbox GL JS`独自の記法である`mapboxgl.StyleFunction`、もしくは`Expression`というものです。Geojsonのプロパティを取得してレイヤーに反映してくれる優れものです。',

  '例えばある街の人口密度を元にポリゴンの高さを表現したいのに、Geojsonのプロパティが「人口(pop)」と「面積(area)」しかないとします。この場合、人口を面積で割る操作が必要なのですが、`Expression`で全て処理することができます。',

  `
~~~tsx

[
    '/',
    ['get','pop'],
    ['get','area']
]
`,

  'プロパティを参照したい場合は`[get, プロパティのキー名]`、プロパティの数字を計算したい場合は配列を[`四則演算`, `される数`, `する数`]の順番で埋め込むことで表現することができます。',

  'また、数字の大きさ、もしくは文字列にマッチするかどうかでカラーグラデーションを作りたい時は、',

  `
~~~tsx

[
    'interpolate',
    ['linear],
    ['get', 'プロパティのキー名'],
    '数字1',
    '色1',
    '数字2',
    '色2',
    '数字3',
    '色3',
    ...
]
`,

  'のように設定します。数字の大きさは`interpolate`、マッチは`match`など、色々な表現方法があります。詳しくは[Mapbox GL JS | Expressions](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/)をご参照ください。',

  '表現方法がわからない場合は、[Mapbox Studio](https://studio.mapbox.com/)のStyleで実際にコードを生成することができるので、そちらをご活用ください。',

  '↓右下のコードマークで配列を生成することができます。',

  `![](${image1})`,

  0,

  '#### ② ラスタタイルを読み込む',

  'ラスタタイルとは、画像をURLで配信してマップに埋め込んで表現する方法です。地球をメルカトル図法でタイル状に分割して、各タイルごとに画像URLを配信します。',

  `
  ~~~js
  https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png
  `,

  '上のURLは[国土地理院ハザードマップポータルサイト](https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html)から拝借したURLです。URLに`{z}/{x}/{y}`がついていますが、このまま`<Source />`に入れ込むことで、Mapbox側が勝手に数字を入れてフェッチしてくれます。',

  `
~~~tsx
<Source 
  id={source_id} 
  type='raster' 
  tiles=['https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png'] 
  tileSize={256} >

　　<Layer 
　　　　id={layer_id}
　　　　type='raster'
　　/>

</Source>
`,

  '`tileSize`はタイルの分割度合いを決めるものですが、特に気にせず256と入力してしまって大丈夫です。タイルについてイメージがわかない場合は[地理院地図 | 座標確認ページ](https://maps.gsi.go.jp/development/tileCoordCheck.html#5/35.362/138.731)から分割されたタイルを確認することができます。',

  0,

  '#### ③ Mapbox Studioベクタタイルを読み込む',

  'Mapboxには`Mapbox Studio`という、地図データをコードではなくウェブ上でスタイリングするアプリケーションがあります。こちらであらかじめスタイリングしておいて、URLで配信して表現することができます。ラスタとは異なりベクタは画像ではないので、プロパティも一緒にと読み込むことができます。',

  'フロントエンドのフォルダに入れるには容量が大きすぎるデータを使用する際に、[Mapbox Tiling Service(MTS)](https://docs.mapbox.com/mapbox-tiling-service/guides/)を予め読み込んでStudioでスタイリング、最終的にタイルにする、という形で配信することでアプリを軽くすることができます。',

  'こちらはサンプルですが、各スタイルの詳細タブに`tilesetID`というものがあります。これを`mapbox://`の後に入れてベクタタイルのURLを生成します。',

  `![](${image2})`,

  '最終的には下のようになります。',

  `
~~~tsx
<Source id={source_id} type='vector' url={ 'mapbox://{tilesetId}' } >

　　<Layer 
        id={layer_id}
        type='fill' 
        source-layer={sourceLayer}
        paint={{
            'fill-color': 'blue',
            'fill-opacity': 0.9
        }} 
　　/>

</Source>
`,

  '必要なプロパティは、',

  '- `id`: 各コンポーネントのidです。',

  '- `type`: レイヤーの形です。',

  '- `source-layer`: ベクタタイルの中のどのレイヤーを表現したいかを決めます。',

  '- `paint`: レイヤーの色や形を決めます。',

  '`source-layer`はStudio内の左に名前が書いてあります。(depth)',

  `![](${image3})`,

  '長くなりましたが、主にこの3種類を使用することになります。',

  0,

  '### レイヤーのプロパティを取得する',

  '各`Feature`のプロパティを入手するには、`<Map />`コンポーネントにレイヤーを紐付けなければなりません。',

  `
~~~tsx
<Map

 ~~~諸々の設定

 interactiveLayerIds={[layer_id_1, layer_id_2, ...]}

 onClick={(e: mapboxgl.MapLayerMouseEvent) => {

    if (!e.features) return
    if (!e.features[0]) return
    if (!e.features[0].properties) return

    ~~~格納

 }}

>

~~~レイヤ

`,

  '例えばクリックした際に、クリックした地点のプロパティを取得した場合、上のようなコードになります。重要なのは、`interactiveLayerIds`に`<Layer />`のidを文字配列型で格納することです。これでマップがレイヤーと紐付いてくれます',

  'その後、`mapboxgl.MapLayerMouseEvent`という型のクリックイベントが返ってくるので、こちらを好きな方法で格納します。`features`がデフォルトで配列型で返ってくるのは、クリックした地点にレイヤーが複数ある場合に全て格納するためです。ただし、クリックした地点にレイヤーの`Feature`が存在しない場合もあるので、`undefined`型ガードは必ずしましょう。',
];
