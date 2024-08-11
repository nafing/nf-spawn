import { create } from "zustand";

export const useToggle = create<StateToggle>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));

export const useConfig = create<StateConfig>((set, get) => ({
  config: {
    maxCharacters: 5,
    colors: {
      main: "#09ffc1",
    },
    locale: {},
  },

  setConfig: (config) => set({ config }),
  getLocale: (key: any) => {
    const splitedString = key.split(".");

    let result = get().config.locale;

    for (let i = 0; i < splitedString.length; i++) {
      if (result[splitedString[i]]) {
        result = result[splitedString[i]];
      } else {
        return key;
      }
    }

    return result;
  },
}));

export const usePlayerLocation = create<StatePlayerLocation>((set) => ({
  lastLocation: null,
  setLastLocation: (lastLocation) => set({ lastLocation }),
}));

export const useApartments = create<StateApartments>((set) => ({
  apartments: [],
  setApartments: (apartments) => set({ apartments }),
}));

export const useProperties = create<StateProperties>((set) => ({
  properties: [],
  setProperties: (properties) => set({ properties }),
}));
