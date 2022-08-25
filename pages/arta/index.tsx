import { useQuery } from "react-query";
import {
  faBuilding,
  faHouseUser,
  faSign,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button";
import Card from "components/Card";
import Icon from "components/Icon";
import Tabs from "components/Tabs";
import GoogleMapReact from "google-map-react";
import { Dispatch, SetStateAction, useState } from "react";
import { GeoCodeType } from "types/google/GeoCodeType";
import Select from "components/Select";
import { Form, Formik } from "formik";
import TextArea from "components/TextArea";
import classNames from "classnames";
import Badge from "components/Badge";

export type LocationType = {
  name: string;
  lat: number;
  lng: number;
};

export type PartnerType = {
  name: string;
  color: string;
  locations: LocationType[];
};

export const PARTNERS: PartnerType[] = [
  {
    name: "Mano Pizza",
    color: "#ff9ab1",
    locations: [
      {
        name: "Frognerveien 2, 0257 Oslo",
        lat: 59.9153241,
        lng: 10.7147326,
      },
      {
        name: "Markveien 46, 0554 Oslo",
        lat: 59.9213597,
        lng: 10.7554825,
      },
      {
        name: "Pedersgata 7, 4013 Stavanger",
        lat: 58.9701571,
        lng: 5.740065,
      },
    ],
  },
  {
    name: "Food Family",
    color: "#FFA500",
    locations: [
      {
        name: "Kolstadgata 22, 0653 Oslo",
        lat: 59.9139188,
        lng: 10.7720425,
      },
    ],
  },
  {
    name: "Lucky Sushi",
    color: "#000000",
    locations: [
      {
        name: "Drangedalsvegen 2, 3920 Porsgrunn",
        lat: 59.1413436,
        lng: 9.6374794,
      },
    ],
  },
  {
    name: "Limon",
    color: "#01582E",
    locations: [
      {
        name: "Hegdehaugsveien 27, 0352 Oslo",
        lat: 59.9214653,
        lng: 10.7253289,
      },
    ],
  },
  {
    name: "EDV",
    color: "#3064c0",
    locations: [],
  },
  {
    name: "TT",
    color: "#956317",
    locations: [],
  },
  {
    name: "RR",
    color: "#14926e",
    locations: [],
  },
  {
    name: "TH",
    color: "#b43cfe",
    locations: [],
  },
];

const { GOOGLE_MAP_KEY } = process.env;

type GetAddressParams = {
  lat: number;
  lng: number;
};

async function getAddress({ lat, lng }: GetAddressParams) {
  if (!GOOGLE_MAP_KEY) throw new Error("missing google maps key");

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");

  url.searchParams.append("latlng", `${lat},${lng}`);
  url.searchParams.append("key", GOOGLE_MAP_KEY);

  const response = await fetch(url.href);

  const json: GeoCodeType = await response.json();

  const [address, area] = json.results[0].formatted_address.split(",");

  const formattedAddress = `${address}, ${area}`;

  return formattedAddress;
}

// async function getAddresses(prospects: GoogleMapReact.ClickEventValue[]) {
//   if (!prospects.length) return [];

//   const formattedProspects = prospects.map(({ lat, lng }) => ({ lat, lng }));

//   const promises = formattedProspects.map(getAddress);

//   const addresses = await Promise.all(promises);

//   return addresses;
// }

const defaultProps = {
  center: {
    lat: 59.9246617,
    lng: 10.7563196,
  },
  zoom: 13,
};

const ZOOMED_IN = 15;

type Coordinates = {
  lat: number;
  lng: number;
};

enum ProspectStatusType {
  New = "Ny",
  Processing = "I prosess",
  Dead = "Brent",
}

type SelectedProspectProps = {
  selectedProspectLocation: ProspectType;
  prospects: ProspectType[];
  setProspects: Dispatch<SetStateAction<ProspectType[]>>;
  setViewLocation: Dispatch<SetStateAction<Coordinates | null>>;
};

const STATUS_OPTIONS = Object.values(ProspectStatusType).map(
  (status) => status
);

const CONCEPT_OPTIONS = PARTNERS.map(({ name }) => name);

function getBadgeTheme(status: ProspectStatusType) {
  switch (status) {
    case ProspectStatusType.New:
      return "green";
    case ProspectStatusType.Processing:
      return "blue";
    case ProspectStatusType.Dead:
      return "red";
  }
}

function SelectedProspect({
  selectedProspectLocation,
  setViewLocation,
  prospects,
  setProspects,
}: SelectedProspectProps) {
  const [isEditing, setIsEditing] = useState(false);

  const initialValues = {
    status: selectedProspectLocation.status,
    description: selectedProspectLocation.description,
    concepts: selectedProspectLocation.concepts,
  };

  return (
    <Card
      size="md"
      title={selectedProspectLocation.address}
      trailing={
        <Icon
          icon={faTimes}
          className="cursor-pointer"
          size="2x"
          onClick={() => setViewLocation(null)}
        />
      }
    >
      {isEditing ? (
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={async ({ description, status, concepts }) => {
            const updatedProspects = prospects.map((prospect) => {
              const isSelectedProspect =
                selectedProspectLocation.lat === prospect.lat &&
                selectedProspectLocation.lng === prospect.lng;

              if (isSelectedProspect) {
                return {
                  ...prospect,
                  status,
                  description,
                  concepts,
                };
              }

              return prospect;
            });
            setProspects(updatedProspects);
            setIsEditing(false);
          }}
        >
          {({
            values: { description, status, concepts },
            setFieldValue,
            isSubmitting,
            isValid,
            errors,
          }) => {
            const nonAddedOptions = CONCEPT_OPTIONS.filter(
              (concept) => !concepts.includes(concept)
            );

            return (
              <Form className="h-full flex flex-col">
                <div className="flex flex-col grow gap-4">
                  <Select
                    label="Oppdater status"
                    options={STATUS_OPTIONS}
                    value={status}
                    onChange={(value) => setFieldValue("status", value)}
                  />

                  <TextArea
                    label="Kommentar"
                    placeholder={`5 minutter unna kollektiv transport. Fint lokale...`}
                    className="resize-none"
                    value={description}
                    rows={5}
                    onChange={(event) =>
                      setFieldValue("description", event?.target.value)
                    }
                  />
                  <Select
                    label="Legg til konsepter"
                    options={nonAddedOptions}
                    value={nonAddedOptions[0]}
                    onChange={(value) =>
                      setFieldValue("concepts", [...concepts, value])
                    }
                  />

                  {concepts.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {concepts.map((concept, index) => (
                        <div key={index}>
                          <Badge>
                            <div className="flex gap-2 items-center whitespace-nowrap">
                              <span>{concept}</span>
                              <Icon
                                icon={faTimes}
                                onClick={() => {
                                  const newConcepts = concepts.filter(
                                    (c) => c !== concept
                                  );

                                  setFieldValue("concepts", newConcepts);
                                }}
                                className="cursor-pointer"
                              />
                            </div>
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button className="bg-red-700">Avbryt</Button>
                  <Button type="submit">Lagre</Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex flex-col grow">
            <div className="flex flex-col gap-4 text-gray-700">
              <div className="flex gap-1 items-center">
                <span className="font-bold mt-1">Status:</span>
                <div>
                  <Badge theme={getBadgeTheme(selectedProspectLocation.status)}>
                    {selectedProspectLocation.status}
                  </Badge>
                </div>
              </div>

              <div>
                <span className="font-bold">Kommentar:</span>
                <p>
                  {selectedProspectLocation.description ? (
                    selectedProspectLocation.description
                  ) : (
                    <span className="text-gray-600 italic">
                      Ingen kommentar lagt til ennå
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col">
                <span className="font-bold">Konsepter:</span>
                {selectedProspectLocation.concepts.length ? (
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProspectLocation.concepts.map((concept) => (
                      <Badge>{concept}</Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-600 italic">
                    Ingen konsepter lagt til ennå
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              className="bg-red-700"
              onClick={() => {
                const updatedProspects = prospects.filter((prospect) => {
                  const isSelectedProspect =
                    selectedProspectLocation.lat === prospect.lat &&
                    selectedProspectLocation.lng === prospect.lng;

                  return !isSelectedProspect;
                });
                setProspects(updatedProspects);
              }}
            >
              Slett
            </Button>
            <Button onClick={() => setIsEditing(true)}>Oppdater</Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function getProspectStatusColor(status: ProspectStatusType) {
  switch (status) {
    case ProspectStatusType.New:
      return "#5edcf9";
    case ProspectStatusType.Processing:
      return "#0000FF";
    case ProspectStatusType.Dead:
      return "#FF0000";
    default:
      return "purple";
  }
}

type ProspectType = {
  address: string;
  lat: number;
  lng: number;
  status: ProspectStatusType;
  description: string;
  concepts: string[];
};

export default function Arta() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [viewLocation, setViewLocation] = useState<Coordinates | null>(null);
  const [prospects, setProspects] = useState<ProspectType[]>([]);

  if (!GOOGLE_MAP_KEY) throw new Error("missing google maps key");

  const tabs = [
    {
      name: "Portefølje",
      icon: faBuilding,
    },
    {
      name: "Prospekter",
      icon: faSign,
    },
  ];

  const center = viewLocation
    ? {
        lat: viewLocation.lat,
        lng: viewLocation.lng,
      }
    : defaultProps.center;

  const zoom = viewLocation ? ZOOMED_IN : defaultProps.zoom;

  const allLocations = PARTNERS.reduce((accumulator, { locations }) => {
    accumulator = [...accumulator, ...locations];

    return accumulator;
  }, [] as LocationType[]);

  const isProspectViewLocation = allLocations.every(
    ({ lat, lng }) =>
      viewLocation && lat !== viewLocation.lat && lng !== viewLocation.lng
  );

  const selectedProspectLocation = isProspectViewLocation
    ? prospects.find(
        ({ lat, lng }) =>
          viewLocation && lat === viewLocation.lat && lng === viewLocation.lng
      )
    : null;

  return (
    <>
      <div className="h-screen" />
      <div className="absolute left-0 right-0 bottom-0 top-16">
        <div className="relative w-full h-full">
          <div className="absolute top-2 left-2 z-10 flex gap-2">
            <Card size="sm">
              <Tabs
                tabs={tabs}
                selectedIndex={activeTabIndex}
                onClick={(index) => {
                  setViewLocation(null);
                  setActiveTabIndex(index);
                }}
              >
                {/* PORTFOLIO */}
                <div>
                  {PARTNERS.sort((a, b) => a.name.localeCompare(b.name)).map(
                    ({ name, locations, color }, index) => {
                      return (
                        <div key={index}>
                          <h2 className="mt-4 font-semibold text-lg">{name}</h2>
                          {locations.length ? (
                            <ul className="divide-y divide-gray-200">
                              {locations.map(({ name, lat, lng }) => {
                                return (
                                  <li
                                    onClick={() =>
                                      setViewLocation({ lat, lng })
                                    }
                                    className="py-4 flex items-center gap-2 cursor-pointer"
                                  >
                                    <div
                                      className="ml-2 h-3 w-3 rounded-full"
                                      style={{ backgroundColor: color }}
                                    />
                                    <p className="text-sm font-medium text-gray-900">
                                      {name}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            <div className="py-4 flex items-center gap-2">
                              <div
                                className="ml-2 h-3 w-3 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                              <p className="text-sm font-medium italic text-gray-600">
                                Ingen lokasjoner
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>

                {/* PROSPECTS */}
                <ul className="divide-y divide-gray-200">
                  {prospects.map(({ address, lat, lng, status }, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => setViewLocation({ lat, lng })}
                        className="py-4 flex items-center gap-2 cursor-pointer"
                      >
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: getProspectStatusColor(status),
                          }}
                        />
                        <p className="text-sm font-medium text-gray-900">
                          {address}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </Tabs>
            </Card>
            {isProspectViewLocation && selectedProspectLocation && (
              <SelectedProspect
                selectedProspectLocation={selectedProspectLocation}
                setViewLocation={setViewLocation}
                prospects={prospects}
                setProspects={setProspects}
              />
            )}
          </div>
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_MAP_KEY }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            center={center}
            zoom={zoom}
            onClick={async ({ lat, lng }) => {
              const address = await getAddress({ lat, lng });

              const newProspect = {
                address,
                lat,
                lng,
                concepts: [],
                status: ProspectStatusType.New,
                description: "",
              };

              setProspects((previous) => [...previous, newProspect]);
              // setViewLocation(null);
              setActiveTabIndex(1);
            }}
          >
            {allLocations.map(({ lat, lng }) => {
              const isViewing =
                lat === viewLocation?.lat && lng === viewLocation.lng;

              let markerColor = "black";

              PARTNERS.forEach(({ locations, color }) => {
                const isInPartner = locations.find(
                  (location) => location.lat === lat && location.lng === lng
                );

                if (isInPartner) markerColor = color;
              });

              return (
                <div
                  /* @ts-ignore */
                  lat={lat}
                  lng={lng}
                  className={classNames(
                    "rounded-full bg-white grid place-items-center z-[10000] cursor-pointer border",
                    isViewing ? "w-12 h-12" : "w-8 h-8"
                  )}
                  style={{ borderColor: markerColor }}
                  onClick={() => {
                    setActiveTabIndex(0);
                    setViewLocation({ lat, lng });
                  }}
                >
                  <Icon
                    color={markerColor}
                    icon={faBuilding}
                    size={isViewing ? "3x" : "2x"}
                  />
                </div>
              );
            })}
            {prospects.map(({ lat, lng, status }) => {
              const isViewing =
                viewLocation?.lat === lat && viewLocation?.lng === lng;

              const color = getProspectStatusColor(status);
              return (
                <div
                  /* @ts-ignore */
                  lat={lat}
                  lng={lng}
                  style={{ borderColor: color }}
                  className="z-[10000] relative"
                  onClick={() => {
                    setActiveTabIndex(1);
                    setViewLocation({ lat, lng });
                  }}
                >
                  <div
                    className={classNames(
                      "rounded-full bg-white grid place-items-center cursor-pointer border absolute -left-2 -top-7",
                      isViewing ? "w-12 h-12" : "w-8 h-8"
                    )}
                    style={{ borderColor: color }}
                  >
                    <Icon
                      color={color}
                      icon={faSign}
                      size={isViewing ? "3x" : "2x"}
                    />
                  </div>
                </div>
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
}
