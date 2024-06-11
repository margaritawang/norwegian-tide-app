import { createContext } from "react";

type TidalWaterContextValues = {
  selectedHarbors: string[];
  setSelectedHarbors: (harbors: string[]) => void;
  syncViewEnabled: boolean;
  setSyncViewEnabled: (enabled: boolean) => void;
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, newValue: string) => void;
};

const tidalWaterContextInitialValues: TidalWaterContextValues = {
  selectedHarbors: [],
  setSelectedHarbors: () => {},
  syncViewEnabled: false,
  setSyncViewEnabled: () => {},
  handleAdd: () => {},
  handleRemove: () => {},
  handleUpdate: () => {},
};

export const TidalWaterContext = createContext(tidalWaterContextInitialValues);
