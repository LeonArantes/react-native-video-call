import styled from 'styled-components';
import {
  ICON_DISCONNECT_CALL,
  ICON_MIC,
  ICON_MIC_OFF,
  ICON_ROTATE_CAMERA,
  ICON_CHAT,
  ICON_EXPAND_CAMERA,
} from '../../constants/icons';

export const RoomContainer = styled.View`
  flex: 1;
`;

export const RoomWrapper = styled.View`
  width: 100%;
  height: 100%;
`;

export const RoomWrapperParticipantFixed = styled.View`
  width: 100%;
  height: 100%;
`;

export const RoomWrapperMiniatureParticipants = styled.View`
  margin-top: 10px;
  width: 130px;
  height: 130px;
  background: #0a58ed30;
  border-radius: 14px;
  overflow: hidden;
`;

export const RoomListMiniatureParticipants = styled.ScrollView.attrs({
  bounces: false,
  horizontal: true,
  decelerationRate: 'fast',
  snapToInterval: 130,
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})``;

export const RoomMiniatureParticipants = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 120px;
  height: 100%;
  border-radius: 14px;
  margin-right: 10px;
  border: 1px solid #0a58ed30;
`;

export const RoomWrapperActions = styled.View`
  width: 100%;
  height: 90px;
  /* background: #0a58ed; */
  position: absolute;
  bottom: 0;
  flex-direction: row;
  padding: 0 20px;
  padding-top: 10px;
  justify-content: space-around;
`;

export const RoomActionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 50px;
  height: 50px;
  background: ${({background = 'transparent'}) => background};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff40;
`;

export const RoomIconDisconnectCall = styled(ICON_DISCONNECT_CALL).attrs({
  width: 22,
  height: 22,
  stroke: '#f0f5ff',
})``;

export const RoomIconMic = styled(ICON_MIC).attrs({
  width: 22,
  height: 22,
  stroke: '#f0f5ff',
})``;

export const RoomIconMicOff = styled(ICON_MIC_OFF).attrs({
  width: 22,
  height: 22,
  stroke: '#f0f5ff',
})``;

export const RoomIconRotateCamera = styled(ICON_ROTATE_CAMERA).attrs({
  width: 24,
  height: 24,
  stroke: '#f0f5ff',
})``;

export const RoomIconChat = styled(ICON_CHAT).attrs({
  width: 24,
  height: 24,
  stroke: '#f0f5ff',
})``;

export const RoomButtonChangeFixedParticipant = styled.TouchableOpacity`
  z-index: 999;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const RoomIconChangeFixedParticipant = styled(ICON_EXPAND_CAMERA).attrs({
  width: 24,
  height: 24,
  stroke: '#f0f5ff',
})``;
