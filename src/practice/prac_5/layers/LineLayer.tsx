import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Layer, Source } from 'react-map-gl';

interface LineLayerProps {
  data: any;
  paint: mapboxgl.LinePaint | undefined;
  source_id: string;
  layer_id: string;
}

const LineLayer: React.FC<LineLayerProps> = (props) => {
  const { data, paint, source_id, layer_id } = props;

  const geojson = data as FeatureCollection<Geometry, GeoJsonProperties>;

  return (
    <Source id={source_id} type='geojson' data={geojson}>
      <Layer id={layer_id} type='line' paint={paint} />
    </Source>
  );
};

export default LineLayer;
