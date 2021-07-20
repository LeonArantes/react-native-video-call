import styled from 'styled-components';
import {ICON_BACK} from '../../constants/icons';

export const JoinRoomKeyboardAvoid = styled.KeyboardAvoidingView`
  flex: 1;
  background: #ffffff;
`;

export const JoinRoomContainer = styled.ScrollView.attrs({
  bounces: false,
})`
  flex: 1;
  padding: 20px;
  background: #ffffff;
`;

export const JoinRoomButtonBack = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 40px;
  height: 40px;
  background: #f0f5ff;
  border-radius: 40px;
  margin-left: 20px;
  align-items: center;
  justify-content: center;
`;

export const JoinRoomIconBack = styled(ICON_BACK).attrs({
  width: 20,
  height: 20,
  stroke: '#0A58ED',
})``;

export const JoinRoomWrapperTitle = styled.View`
  margin-top: 20px;
`;

export const JoinRoomTitle = styled.Text`
  font-size: 32px;
`;

export const JoinRoomWrapperInputs = styled.View`
  margin-top: 40px;
`;

export const JoinRoomButtonSave = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  padding: 12px;
  background: ${({background = 'transparent'}) => background};
  border: 1px solid ${({borderColor = 'transparent'}) => borderColor};
  border-radius: 14px;
  margin-top: 50px;
  align-items: center;
`;

export const JoinRoomLabelButtonSave = styled.Text`
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  color: ${({color = 'white'}) => color};
`;
