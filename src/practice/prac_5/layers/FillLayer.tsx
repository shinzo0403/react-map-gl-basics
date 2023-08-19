import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Layer, Source } from 'react-map-gl';

interface FillLayerProps {
  data: any;
  paint: mapboxgl.FillPaint | undefined;
  source_id: string;
  layer_id: string;
}

const FillLayer: React.FC<FillLayerProps> = (props) => {
  const { data, paint, source_id, layer_id } = props;

  const geojson = data as FeatureCollection<Geometry, GeoJsonProperties>;

  return (
    <Source id={source_id} type='geojson' data={geojson}>
      <Layer id={layer_id} type='fill' paint={paint} />
    </Source>
  );
};

export default FillLayer;
