import mapboxgl from 'mapbox-gl';

export const mapConfig = {
  mapboxAccessToken: process.env.REACT_APP_MTS_TOKEN,
  mapStyle: 'mapbox://styles/aihubble/cl5lvvl7o001415nsknnlk29t',
  attributionControl: false,
};

export const mapStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
  cursor: 'grab',
  zIndex: -1,
};

//マップの基礎情報
export const lib = new mapboxgl.LngLatBounds([
  [139.533231, 35.409578],
  [139.912163, 36.023026],
]);
