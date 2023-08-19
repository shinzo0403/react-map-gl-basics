import { Box, Stack, Typography } from '@mui/material';
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
        onMouseMove={(e) => setLnglat(e.lngLat)}
      >
        {/* 普通のポップアップ */}
        <Popup longitude={139.933231} latitude={35.723026}>
          普通のポップアップ
        </Popup>

        {/* 閉じるボタンなし */}
        <Popup
          longitude={139.333231}
          latitude={35.723026}
          closeButton={false}
          closeOnClick={false}
        >
          閉じるボタンなし
        </Popup>

        {/* マウス操作に合わせたポップアップ */}
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
