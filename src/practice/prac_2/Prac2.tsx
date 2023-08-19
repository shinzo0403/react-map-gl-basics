import { Box } from '@mui/material';
import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { lib, mapConfig, mapStyle } from '../../utils/maps/MapConfig';
import VisibleButton from './VisibleButton';

/** 画像を表示させるマーカー */
const markerStyle = {
  backgroundImage: `url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  width: 70,
  height: 70,
};

const Prac2: React.FC = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Box
      sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}
    >
      <Map {...mapStyle} {...mapConfig} initialViewState={{ bounds: lib }}>
        {/* 普通のマーカー */}
        <Marker longitude={139.733231} latitude={35.823026} />

        {/* 表示切り替え可能なマーカー */}
        {visible && (
          <Marker longitude={139.433231} latitude={35.623026} color={'red'} />
        )}

        {/* 画像を表示するマーカー */}
        <Marker
          longitude={139.033231}
          latitude={35.723026}
          style={{ cursor: 'pointer' }}
        >
          <Box sx={markerStyle} />
        </Marker>

        {/* {マーカー出現ボタン} */}
        <VisibleButton onVisible={setVisible} visible={visible} />
      </Map>
    </Box>
  );
};

export default Prac2;
