import {
  faHouseUser,
  faLocationArrow,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Button";
import GoogleMapReact from "google-map-react";
import { useState } from "react";

const defaultProps = {
  center: {
    lat: 59.9246617,
    lng: 10.7563196,
  },
  zoom: 13,
};

type LocationType = {
  name: string;
  latitude: number;
  longitude: number;
};

type PartnerType = {
  name: string;
  color: string;
  locations: LocationType[];
};

const PARTNERS: PartnerType[] = [
  {
    name: "Mano Pizza",
    color: "#FACAD5",
    locations: [
      {
        name: "Frognerveien 2",
        latitude: 59.9153241,
        longitude: 10.7147326,
      },
      {
        name: "Markveien 46",
        latitude: 59.9213597,
        longitude: 10.7554825,
      },
      {
        name: "Pedersgata 7",
        latitude: 58.9701571,
        longitude: 5.740065,
      },
    ],
  },
  {
    name: "Jasa Medical",
    color: "#4caf50",
    locations: [
      {
        name: "Jens Zetlitz gate 25",
        latitude: 58.9670729,
        longitude: 5.7247865,
      },
    ],
  },
  {
    name: "Limon",
    color: "#01582E",
    locations: [
      {
        name: "Hegdehaugsveien 27",
        latitude: 59.9214653,
        longitude: 10.7253289,
      },
    ],
  },
];

const key = process.env.GOOGLE_MAP_KEY;

export default function Arta() {
  const [selectedViewLocation, setSelectedViewLocation] =
    useState<LocationType | null>(null);

  const [selectedLocation, setSelectedLocation] =
    useState<GoogleMapReact.ClickEventValue>();

  if (!key) return "missing key";

  const center = selectedViewLocation
    ? {
        lat: selectedViewLocation.latitude,
        lng: selectedViewLocation.longitude,
      }
    : defaultProps.center;
  const zoom = selectedViewLocation ? 14 : defaultProps.zoom;

  const allLocations = PARTNERS.reduce((accumulator, { locations }) => {
    accumulator = [...accumulator, ...locations];

    return accumulator;
  }, [] as LocationType[]);

  return (
    <>
      <div className="h-screen" />
      <div className="absolute left-0 right-0 bottom-0 top-16 bg-green-600">
        <div className="relative w-full h-full">
          <div className="absolute w-96 h-48 bg-white top-2 left-2 z-10">
            {PARTNERS.map(({ name, locations }) => {
              return (
                <div>
                  <h1>{name}</h1>
                  <h2>Lokasjoner:</h2>
                  {locations.map((location) => {
                    const { name } = location;
                    return (
                      <Button onClick={() => setSelectedViewLocation(location)}>
                        <h2>{name}</h2>
                      </Button>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <GoogleMapReact
            bootstrapURLKeys={{ key }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            center={center}
            zoom={zoom}
            onClick={(event) => {
              setSelectedLocation(event);
            }}
          >
            {allLocations.map(({ name, latitude, longitude }) => {
              return (
                <FontAwesomeIcon
                  color="" // TODO: Implement this
                  icon={faHouseUser}
                  size={name === selectedViewLocation?.name ? "3x" : "2x"}
                  lat={latitude}
                  lng={longitude}
                />
              );
            })}
            {selectedLocation && (
              <FontAwesomeIcon
                color="#0dcd94"
                icon={faMapPin}
                size="3x"
                lat={selectedLocation.lat}
                lng={selectedLocation.lng}
              />
            )}
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
}
