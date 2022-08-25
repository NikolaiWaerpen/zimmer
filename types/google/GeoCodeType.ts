export type GeoCodeType = {
  plus_code: PlusCode;
  results: Result[];
  status: string;
};

type PlusCode = {
  compound_code: string;
  global_code: string;
};

type Result = {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
  plus_code?: PlusCode;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type Geometry = {
  bounds?: Bounds;
  location: Location;
  location_type: string;
  viewport: Bounds;
};

type Bounds = {
  northeast: Location;
  southwest: Location;
};

type Location = {
  lat: number;
  lng: number;
};
