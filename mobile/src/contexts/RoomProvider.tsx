import React, { createContext, useContext, useReducer } from 'react';

export const RoomContext = createContext();

export const RoomContextProvider = ({ reducer, initialState, children }) => (
  <RoomContext.Provider value={{ reducer, initialState }}>
    {children}
  </RoomContext.Provider>
);

export const useRoomState = () => useContext(RoomContext);
