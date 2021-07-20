import React, {useEffect} from 'react';
import {Platform, Alert} from 'react-native';
import {
  checkMultiple,
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import {
  OnBoardingContainer,
  OnBoardingWrapperIllustration,
  OnBoardingIllustrationTeamChat,
  OnBoardingWrapperInformations,
  OnBoardingTitleInformations,
  OnBoardingDescriptionInformations,
  OnBoardingWrapperButtonJoin,
  OnBoardingButtonJoin,
  OnBoardingLabelButtonJoin,
  OnBoardingIconPhone,
} from './OnBoarding.styles';

const OnBoarding: React.FC = ({navigation}) => {
  const requestPermissions = (callback: any) => {
    const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
    const androidPermissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ];
    checkMultiple(
      Platform.OS === 'ios' ? iosPermissions : androidPermissions,
    ).then(statuses => {
      const [CAMERA, AUDIO] =
        Platform.OS === 'ios' ? iosPermissions : androidPermissions;
      if (
        statuses[CAMERA] === RESULTS.UNAVAILABLE ||
        statuses[AUDIO] === RESULTS.UNAVAILABLE
      ) {
        Alert.alert(
          'Error',
          'Hardware to support video calls is not available',
        );
      } else if (
        statuses[CAMERA] === RESULTS.BLOCKED ||
        statuses[AUDIO] === RESULTS.BLOCKED
      ) {
        Alert.alert(
          'Error',
          'Permission to access hardware was blocked, please grant manually',
        );
      } else {
        if (
          statuses[CAMERA] === RESULTS.DENIED &&
          statuses[AUDIO] === RESULTS.DENIED
        ) {
          requestMultiple(
            Platform.OS === 'ios' ? iosPermissions : androidPermissions,
          ).then(newStatuses => {
            if (
              newStatuses[CAMERA] === RESULTS.GRANTED &&
              newStatuses[AUDIO] === RESULTS.GRANTED
            ) {
              callback && callback();
            } else {
              Alert.alert('Error', 'One of the permissions was not granted');
            }
          });
        } else if (
          statuses[CAMERA] === RESULTS.DENIED ||
          statuses[AUDIO] === RESULTS.DENIED
        ) {
          request(statuses[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO).then(
            result => {
              if (result === RESULTS.GRANTED) {
                callback && callback();
              } else {
                Alert.alert('Error', 'Permission not granted');
              }
            },
          );
        } else if (
          statuses[CAMERA] === RESULTS.GRANTED ||
          statuses[AUDIO] === RESULTS.GRANTED
        ) {
          callback && callback();
        }
      }
    });
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <OnBoardingContainer>
      <OnBoardingWrapperIllustration>
        <OnBoardingIllustrationTeamChat />
      </OnBoardingWrapperIllustration>

      <OnBoardingWrapperInformations>
        <OnBoardingTitleInformations>
          Video Chamadas
        </OnBoardingTitleInformations>
        <OnBoardingDescriptionInformations>
          Mantenha sua equipe conectada por videoconferência empresarial, um
          recurso criado com a segurança e eficiência da infraestrutura.
        </OnBoardingDescriptionInformations>
      </OnBoardingWrapperInformations>

      <OnBoardingWrapperButtonJoin>
        <OnBoardingButtonJoin
          onPress={() => handleNavigation('JoinRoom')}
          background={'#0A58ED'}>
          <OnBoardingIconPhone />
          <OnBoardingLabelButtonJoin color={'#FFF'}>
            Entrar em uma sala
          </OnBoardingLabelButtonJoin>
        </OnBoardingButtonJoin>
      </OnBoardingWrapperButtonJoin>
    </OnBoardingContainer>
  );
};

export default OnBoarding;
