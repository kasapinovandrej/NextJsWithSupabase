"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type RangeType = {
  from: undefined | Date;
  to: undefined | Date;
};

type StateContextType = {
  range: RangeType;
  setRange: Dispatch<
    SetStateAction<{
      from: undefined | Date;
      to: undefined | Date;
    }>
  >;
  resetRange: () => void;
};

const ReservationContext = createContext<StateContextType>({
  range: {
    from: undefined,
    to: undefined,
  },
  setRange: () => {},
  resetRange: () => {},
});

const initialState = { from: undefined, to: undefined } as RangeType;

const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);
  const value = { range, setRange, resetRange };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");

  return context;
};

export { ReservationProvider, useReservation };
