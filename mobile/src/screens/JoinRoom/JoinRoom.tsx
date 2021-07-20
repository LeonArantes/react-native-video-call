import React, {useLayoutEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';

import {
  JoinRoomKeyboardAvoid,
  JoinRoomContainer,
  JoinRoomButtonBack,
  JoinRoomIconBack,
  JoinRoomWrapperTitle,
  JoinRoomTitle,
  JoinRoomWrapperInputs,
  JoinRoomButtonSave,
  JoinRoomLabelButtonSave,
} from './JoinRoom.styles';

import InputBox from '../../components/InputBox';
import RequestsApi from '../../services/api/requests-api';

const JoinRoom: React.FC = ({navigation, route}) => {
  const inputRoomRef = useRef();
  const inputRoomTokenRef = useRef();
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <JoinRoomButtonBack onPress={() => navigation.goBack()}>
          <JoinRoomIconBack />
        </JoinRoomButtonBack>
      ),
      headerTitle: () => null,
      title: null,
    });
  }, [navigation]);

  const handleJoinRoom = async () => {
    try {
      Keyboard.dismiss();
      if (userName?.trim().length && roomName?.trim().length) {
        const responseToken = await RequestsApi.getToken(userName);
        console.log(responseToken);
        if (responseToken) {
          navigation.navigate('Room', {
            userName,
            roomName,
            roomToken: responseToken,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <JoinRoomKeyboardAvoid>
      <JoinRoomContainer>
        <JoinRoomWrapperTitle>
          <JoinRoomTitle>Entrar em uma sala</JoinRoomTitle>
        </JoinRoomWrapperTitle>
        <JoinRoomWrapperInputs>
          <InputBox
            inputRef={inputRoomRef}
            inputValue={userName}
            inputOnChangeText={(text: string) => setUserName(text)}
            inputLabel="Nome do usuário"
            inputAutoFocus={true}
            returnKeyType="next"
            inputSubmitEditing={() => inputRoomTokenRef?.current?.focus()}
          />
          <InputBox
            inputRef={inputRoomTokenRef}
            inputValue={roomName}
            inputOnChangeText={(text: string) => setRoomName(text)}
            returnKeyType="next"
            inputLabel="Nome da sala"
            inputSubmitEditing={null}
          />
          <JoinRoomButtonSave
            onPress={() => handleJoinRoom()}
            background={'#0A58ED'}>
            <JoinRoomLabelButtonSave color={'#FFF'}>
              Entrar
            </JoinRoomLabelButtonSave>
          </JoinRoomButtonSave>
        </JoinRoomWrapperInputs>
      </JoinRoomContainer>
    </JoinRoomKeyboardAvoid>
  );
};

export default JoinRoom;
