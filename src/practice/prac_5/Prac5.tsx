import { Box, Typography } from '@mui/material';
import { GeoJsonProperties } from 'geojson';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import Map, { Popup } from 'react-map-gl';
import { lib, mapConfig, mapStyle } from '../../utils/maps/MapConfig';
import CircleLayer from './layers/CircleLayer';
import FillLayer from './layers/FillLayer';
import LineLayer from './layers/LineLayer';
import { LineString, Points, Polygon } from './Source';
import { PointColor } from './Style';

type popupType =
  | {
      geom: mapboxgl.LngLat;
      prop?: GeoJsonProperties;
    }
  | undefined
  | null;

const Prac5: React.FC = () => {
  const [cursor, setCursor] = React.useState<'grab' | 'grabbing'>('grab');

  const [popup, setPopup] = React.useState<popupType>({
    geom: new mapboxgl.LngLat(138.83352130008934, 35.79876916839274),
    prop: { hint: 'レイヤーをホバーしてみてください' },
  });

  return (
    <Box
      sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}
    >
      <Map
        {...mapStyle}
        {...mapConfig}
        onClick={(e) => console.log(e.lngLat)}
        initialViewState={{ bounds: lib }}
        cursor={cursor}
        onMouseDown={() => setCursor('grabbing')}
        onMouseUp={() => setCursor('grab')}
        onMouseMove={(e) => {
          setPopup(null);
          if (!e.features) return;
          if (!e.features[0]) return;
          setPopup({
            geom: e.lngLat,
            prop: e.features[0].properties,
          });
        }}
        interactiveLayerIds={['polygon-layer', 'line-layer', 'point-layer']}
      >
        <FillLayer
          layer_id={'polygon-layer'}
          source_id={'polygon-source'}
          data={Polygon}
          paint={{
            'fill-color': ['get', 'colorSetting'],
            'fill-opacity': 0.9,
          }}
        />
        <LineLayer
          layer_id={'line-layer'}
          source_id={'line-source'}
          data={LineString}
          paint={{
            'line-color': 'red',
            'line-width': 5,
          }}
        />
        <CircleLayer
          layer_id={'point-layer'}
          source_id={'point-source'}
          data={Points}
          paint={{
            'circle-radius': {
              base: 3,
              stops: [
                [14, 5],
                [20, 100],
              ],
            },
            'circle-color': PointColor,
          }}
        />
        {popup && popup.prop && (
          <Popup
            longitude={popup.geom.lng}
            latitude={popup.geom.lat}
            closeButton={false}
            closeOnClick={false}
            maxWidth={'max-content'}
          >
            <Typography letterSpacing={1.5} fontSize={'0.8rem'}>
              {JSON.stringify(popup.prop)}
            </Typography>
          </Popup>
        )}
      </Map>
    </Box>
  );
};

export default Prac5;
