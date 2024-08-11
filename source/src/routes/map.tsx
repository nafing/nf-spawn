import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToString } from "react-dom/server";
import { IconHomeFilled, IconPointFilled } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import {
  emitNet,
  useApartments,
  usePlayerLocation,
  useProperties,
  useToggle,
} from "@/hooks";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/map")({
  component: Map,
});

const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

const CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  scale: function (zoom: number) {
    return Math.pow(2, zoom);
  },
  zoom: function (sc: number) {
    return Math.log(sc) / 0.6931471805599453;
  },
  distance: function (pos1: L.LatLng, pos2: L.LatLng) {
    const x_difference = pos2.lng - pos1.lng;
    const y_difference = pos2.lat - pos1.lat;
    return Math.sqrt(x_difference * x_difference + y_difference * y_difference);
  },
  transformation: new L.Transformation(scale_x, center_x, -scale_y, center_y),
  infinite: true,
});

function customIcon(type: any) {
  if (type === "lastLocation") {
    return L.divIcon({
      html: renderToString(<IconPointFilled className="map-icon-last" />),
      iconAnchor: [20, 20],
      popupAnchor: [-10, -27],
    });
  } else if (type === "apartment") {
    return L.divIcon({
      html: renderToString(<IconHomeFilled className="map-icon" />),
      iconAnchor: [20, 20],
      popupAnchor: [-10, -27],
    });
  }
}

function Map() {
  const { setOpen } = useToggle();
  const { lastLocation } = usePlayerLocation();
  const { apartments } = useApartments();
  const { properties } = useProperties();

  const GtaVMapContainer = () => {
    const map = useMap();

    useEffect(() => {
      handleRecenterClick(map);
    }, []);

    return null;
  };

  const handleRecenterClick = (map: any) => {
    map.setView([-900, 200], 4);
  };

  return (
    <div className="map-container">
      <div className="map">
        <MapContainer
          crs={CUSTOM_CRS}
          minZoom={2}
          maxZoom={5}
          preferCanvas={true}
          center={[-900, 200]}
          zoom={4}
          style={{ width: "80vw", height: "80vh", background: "#0fa8d2" }}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer url="./html/assets/mapStyles/styleAtlas/{z}/{x}/{y}.jpg" />

          <GtaVMapContainer />

          {apartments.map((item, i) => (
            <Marker
              key={i}
              position={[item.enter.y, item.enter.x]}
              icon={customIcon("apartment")}
            >
              <Popup>
                <div className="popup-title">{item.label}</div>
                <div className="popup-desc">{item.description}</div>
                <Button
                  onClick={() => {
                    emitNet({
                      eventName: "selectApartment",
                      payload: i,
                      handler() {
                        setOpen(false);
                      },
                    });
                  }}
                >
                  Select Apartment
                </Button>
              </Popup>
            </Marker>
          ))}

          {properties.map((item, i) => (
            <Marker
              key={i}
              position={[item.enter.y, item.enter.x]}
              icon={customIcon("apartment")}
            >
              <Popup>
                <div className="popup-title">{item.label}</div>
                <div className="popup-desc">{item.description}</div>
                <Button
                  onClick={() => {
                    emitNet({
                      eventName: "spawnProperty",
                      payload: item,
                      handler() {
                        setOpen(false);
                      },
                    });
                  }}
                >
                  Select Apartment
                </Button>
              </Popup>
            </Marker>
          ))}

          {lastLocation && (
            <Marker
              position={[lastLocation.y, lastLocation.x]}
              icon={customIcon("lastLocation")}
            >
              <Popup>
                <div className="popup-title">Last Location</div>
                <div className="popup-desc">
                  You will spawn at your last location.
                </div>
                <Button
                  onClick={() => {
                    emitNet({
                      eventName: "spawnAtLastLocation",
                      payload: lastLocation,
                      handler() {
                        setOpen(false);
                      },
                    });
                  }}
                >
                  Select Last Location
                </Button>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
