interface IsLoaded {
  isLoaded: boolean;
  config: Config;
}

type StateToggle = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

interface StateConfig {
  config: Config;
  setConfig: (config: Config) => void;
  getLocale: (key: string) => string;
}

type Config = {
  maxCharacters: number;
  colors: {
    [key: string]: string;
  };
  locale: any;
};

type Spawns = {
  lastLocation: Vector4;
  apartments: Apartment[];
  properties: Apartment[];
};

type Vector3 = {
  x: number;
  y: number;
  z: number;
};

interface Apartment {
  id: number;
  interior: string;
  label: string;
  description: string;
  enter: Vector3;
}

interface StateApartments {
  apartments: Apartment[];
  setApartments: (apartments: Apartment[]) => void;
}

type Vector4 = {
  x: number;
  y: number;
  z: number;
  w: number;
};

interface StatePlayerLocation {
  lastLocation: Vector4 | null;
  setLastLocation: (lastLocation: Vector4) => void;
}

interface StateProperties {
  properties: Apartment[];
  setProperties: (properties: Apartment[]) => void;
}
