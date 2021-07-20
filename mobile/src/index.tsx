import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { RoomContextProvider } from './contexts/RoomProvider';
import App from './App';

const initialState = {
  isAudioEnabled: true,
  status: 'disconnected',
  participants: new Map(),
  videoTracks: new Map(),
  userName: '',
  roomName: '',
  token: '',
};


const Index = () => {
  const [props, setProps] = useState(initialState);
  return (
    <RoomContextProvider
      initialState={props}
      reducer={setProps}>
      <App />
    </RoomContextProvider>
  );
};

export default Index;
