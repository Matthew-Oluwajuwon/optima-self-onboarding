/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoreApi, UseBoundStore, create } from "zustand";

export interface State {
  current?: number;
  genders: Array<string>;
  religions: Array<string>;
  processing: boolean;
  lga: Array<string>;
  moneyRange: Array<string>;
  offenses: Array<string>;
  maritalStatus: Array<string>;
  request: any;
  showResponseModal: boolean;
  loading: boolean;
  record: any;
  showOtp: boolean;
  setAllState: (newState: State) => void;
  setState: (key: keyof State, value: any) => void;
}

export const useStore: UseBoundStore<StoreApi<State>> = create((set) => ({
  current: 0,
  genders: [],
  religions: [],
  lga: [],
  moneyRange: [],
  offenses: [],
  maritalStatus: [],
  request: {},
  processing: false,
  loading: false,
  record: {},
  showResponseModal: false,
  showOtp: false,
  setAllState: (newState: State) => {
    set(() => ({ ...newState }));
  },
  setState: (key: keyof State, value: any) => {
    set((state: State) => ({
      ...state,
      [key]: value,
    }));
  },
}));
