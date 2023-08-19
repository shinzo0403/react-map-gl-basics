import { Box } from '@mui/material';
import React from 'react';
import Map, { MapRef } from 'react-map-gl';
import { lib, mapConfig, mapStyle } from '../../utils/maps/MapConfig';
import ControlPanel, { inter_type } from './ControlPanel';

const Prac4: React.FC = () => {
  const [interaction, setInteraction] = React.useState<inter_type>({
    dragRotate: true,
    dragPan: true,
    doubleClickZoom: true,
    touchPitch: true,
    touchZoomRotate: true,
    scrollZoom: true,
  });

  const [fly, setFly] = React.useState(false);

  const [map, setMap] = React.useState<MapRef | null>();

  React.useEffect(() => {
    if (!map) return;
    map.flyTo({
      center: [Math.random() * 360 - 180, Math.random() * 180 - 90],
      zoom: 3,
    });
  }, [fly]);

  const [cursor, setCursor] = React.useState<'grab' | 'grabbing'>('grab');

  return (
    <Box
      sx={{ width: '100%', maxWidth: 1600, height: 300, position: 'relative' }}
    >
      <ControlPanel
        setInter={setInteraction}
        interState={interaction}
        setFly={setFly}
        fly={fly}
      />
      <Map
        {...mapStyle}
        {...mapConfig}
        initialViewState={{ bounds: lib }}
        ref={(r) => setMap(r)}
        cursor={cursor}
        {...interaction}
        onMouseDown={() => setCursor('grabbing')}
        onMouseUp={() => setCursor('grab')}
      />
    </Box>
  );
};

export default Prac4;
