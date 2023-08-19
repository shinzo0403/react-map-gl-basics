import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Layer, Source } from 'react-map-gl';

interface CircleLayerProps {
  data: any;
  paint: mapboxgl.CirclePaint | undefined;
  source_id: string;
  layer_id: string;
}

const CircleLayer: React.FC<CircleLayerProps> = (props) => {
  const { data, paint, source_id, layer_id } = props;

  const geojson = data as FeatureCollection<Geometry, GeoJsonProperties>;

  return (
    <Source id={source_id} type='geojson' data={geojson}>
      <Layer id={layer_id} type='circle' paint={paint} />
    </Source>
  );
};

export default CircleLayer;
