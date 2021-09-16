import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

import { MapHolder } from './style';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export interface MapInterface {
  coordinates: [number, number];
  zoom?: number;
}

const Maps: React.FC<{coordinates: MapInterface[]}> = ({coordinates}) => {
  const [position, setPosition] = useState<MapInterface>({
    coordinates: [0, 0],
    zoom: 1,
  });
  function handleZoomIn() {
    if (position.zoom && position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom && pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom && position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom && pos.zoom / 2 }));
  }

  function handleMoveEnd(position: MapInterface) {
    setPosition(position);
  }

  return (
    <MapHolder>
      <ComposableMap>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {coordinates.map((item, index)=> <Marker key={index} coordinates={item.coordinates}>
            <circle r={2} fill="#F53" />
          </Marker>)}
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <button type="button" title="Zoom In" onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button type="button" title="Zoom Out" onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </MapHolder>
  );
};
export default Maps;
