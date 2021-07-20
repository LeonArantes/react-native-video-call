import styled from 'styled-components';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

import {ILLUSTRATION_TEAMCHAT} from '../../constants/illustrations';
import {ICON_PHONE} from '../../constants/icons';

export const OnBoardingContainer = styled.ScrollView.attrs({
  bounces: false,
})`
  flex: 1;
  /* padding-top: 20px; */
  background: #ffffff;
`;

export const OnBoardingWrapperIllustration = styled.View`
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
`;

export const OnBoardingIllustrationTeamChat = styled(
  ILLUSTRATION_TEAMCHAT,
).attrs({
  width: windowWidth,
  height: windowWidth,
})``;

export const OnBoardingWrapperInformations = styled.View`
  padding: 0 20px;
`;

export const OnBoardingTitleInformations = styled.Text`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  color: #000;
  margin-bottom: 10px;
`;

export const OnBoardingDescriptionInformations = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #696969;
`;

export const OnBoardingWrapperButtonJoin = styled.View`
  width: 100%;
  padding: 0 30px;
  margin-top: 40px;
`;

export const OnBoardingButtonJoin = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 15px;
  background: ${({background = 'transparent'}) => background};
  border: 1px solid ${({borderColor = 'transparent'}) => borderColor};
  border-radius: 14px;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OnBoardingLabelButtonJoin = styled.Text`
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  color: ${({color = 'white'}) => color};
`;

export const OnBoardingIconPhone = styled(ICON_PHONE).attrs({
  width: 25,
  height: 25,
  stroke: '#FFF',
})`
  margin-right: 15px;
`;
