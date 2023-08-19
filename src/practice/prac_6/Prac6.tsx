import Map from 'react-map-gl';
import { mapConfig, mapStyle } from '../../utils/maps/MapConfig';

const Prac6: React.FC = () => {
  return (
    <>
      <Map {...mapStyle} {...mapConfig} />
    </>
  );
};

export default Prac6;
