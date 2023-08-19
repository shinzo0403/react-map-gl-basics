import Map from 'react-map-gl';
import { mapConfig, mapStyle } from '../../utils/maps/MapConfig';

const Prac7: React.FC = () => {
  return (
    <>
      <Map {...mapStyle} {...mapConfig} />
    </>
  );
};

export default Prac7;
