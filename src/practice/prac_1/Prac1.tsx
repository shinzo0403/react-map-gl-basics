import { Box } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import Map, { Marker } from 'react-map-gl';
import LibButton from './LibButton';

//マップの基礎情報
const lib = new mapboxgl.LngLatBounds([
  [139.533231, 35.409578],
  [139.912163, 36.023026],
]);

const myMapToken =
  'pk.eyJ1IjoiYWlodWJibGUiLCJhIjoiY2trbHR2OHQxMG9kNzJwcGRncWxtd2VzYyJ9.Qh0kMCBJlGw9_T9-FzUolA';
const myMapStyle = 'mapbox://styles/aihubble/cl5lvvl7o001415nsknnlk29t';

const Prac1: React.FC = () => {
  const [switcher, setSwitcher] = React.useState(false);

  return (
    <Box
      sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}
    >
      {/* {マップ本体} */}
      <Map
        mapboxAccessToken={myMapToken}
        mapStyle={myMapStyle}
        initialViewState={{ bounds: lib }}
      >
        {/* {lib確認用マーカー} */}
        {switcher && (
          <>
            <Marker longitude={139.533231} latitude={35.409578} />
            <Marker longitude={139.912163} latitude={36.023026} />
          </>
        )}
      </Map>

      {/* {マーカー出現ボタン} */}
      <LibButton onSwitch={setSwitcher} switcher={switcher} />
    </Box>
  );
};

export default Prac1;
