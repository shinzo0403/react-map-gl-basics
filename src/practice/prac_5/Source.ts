import { point } from '@turf/helpers';
import { FeatureCollection } from 'geojson';

export const Polygon = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [139.70788166843994, 35.77825730471028],
            [139.75138802660274, 35.823808287208934],
            [139.84710201456204, 35.77761555506538],
            [139.8273263972153, 35.71855243300455],
            [139.72291113762242, 35.71855243300455],
          ],
        ],
      },
      properties: {
        type: 'rectangle',
        colorSetting: 'green',
      },
    },
  ],
} as FeatureCollection;

export const LineString = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [139.97958807063884, 35.91295414576818],
          [140.1231448454048, 35.782300042919445],
          [140.26166454035604, 35.88031080277776],
        ],
      },
      properties: {
        type: 'line',
        colorSetting: 'red',
      },
    },
  ],
} as FeatureCollection;

export const PointSource: {
  geom: number[];
  prop: {
    id: string;
  };
}[] = [
  { geom: [139.13352130008934, 35.79876916839274], prop: { id: 'スーパー' } },
  { geom: [139.2301219773857, 35.85471411533483], prop: { id: 'スーパー' } },
  { geom: [139.28532236441367, 35.75274045513052], prop: { id: 'スーパー' } },
  { geom: [139.36658960086947, 35.83731324691246], prop: { id: '学校' } },
  { geom: [139.4877237835101, 35.8596850907451], prop: { id: '学校' } },
  { geom: [139.51225728885447, 35.716645274110746], prop: { id: '学校' } },
  { geom: [139.35585619227953, 35.66807768985795], prop: { id: '学校' } },
  { geom: [139.17952162261093, 35.658111453456115], prop: { id: '駅' } },
  { geom: [139.3911231062138, 35.78384385663196], prop: { id: '駅' } },
  { geom: [139.4892571275937, 35.62321983109365], prop: { id: '駅' } },
  { geom: [139.02005383786644, 35.651881924014646], prop: { id: '公園' } },
  { geom: [139.04152065504366, 35.767671605843006], prop: { id: '公園' } },
  { geom: [139.25312213864652, 35.82239517838239], prop: { id: '公園' } },
];

export const Points = {
  type: 'FeatureCollection',
  features: PointSource.map((row) => {
    return point(row.geom, row.prop);
  }),
} as FeatureCollection;
