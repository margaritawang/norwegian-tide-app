import { createContext } from "react";
import { harbors } from "../utils/constants";

export type HarborType = keyof typeof harbors | "";

type TidalWaterContextValues = {
  selectedHarbors: Array<HarborType>;
  setSelectedHarbors: (newValues: Array<HarborType>) => void;
  syncViewEnabled: boolean;
  setSyncViewEnabled: (enabled: boolean) => void;
  handleAdd: () => void;
  handleRemove: (index: number) => void;
  handleUpdate: (index: number, newValue: HarborType) => void;
};

export const tidalWaterContextInitialValues: TidalWaterContextValues = {
  selectedHarbors: [""],
  setSelectedHarbors: () => {},
  syncViewEnabled: false,
  setSyncViewEnabled: () => {},
  handleAdd: () => {},
  handleRemove: () => {},
  handleUpdate: () => {},
};

export const TidalWaterContext = createContext(tidalWaterContextInitialValues);
