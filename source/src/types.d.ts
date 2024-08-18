type Vector3 = {
  x: number;
  y: number;
  z: number;
};

type Vector4 = {
  x: number;
  y: number;
  z: number;
  w: number;
};

type UIPosition = {
  top: string;
  left: string;
};

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
  colors: {
    [key: string]: string;
  };
  locale: any;
};

type Spawns = {
  defaultSpawns: DefaultSpawns[];
  firstApartments: FirstApartments[];

  lastLocation: Vector4 | null;
};

interface StaticLocations {
  defaultSpawns: DefaultSpawns[];
  firstApartments: FirstApartments[];

  setDefaultSpawns: (defaultSpawns: DefaultSpawns[]) => void;
  sesFirstApartments: (firstApartments: FirstApartments[]) => void;
}

type DefaultSpawns = {
  label: string;
  description: string;
  location: Vector4;
  ui: UIPosition;
};

interface FirstApartments {
  label: string;
  description: string;
  interior: {
    [key: string]: {
      index: number;
      location: Vector3;
    };
  };
  ui: UIPosition;
}

interface CharacterLocations {
  lastLocation: Vector4 | null;
  setLastLocation: (lastLocation: Vector4 | null) => void;
}
