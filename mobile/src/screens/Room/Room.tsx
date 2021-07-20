import React, {useEffect, useRef, useState} from 'react';

import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';

import {
  RoomContainer,
  RoomWrapperParticipantFixed,
  RoomWrapperMiniatureParticipants,
  RoomWrapperActions,
  RoomActionButton,
  RoomIconDisconnectCall,
  RoomIconMic,
  RoomIconMicOff,
  RoomIconRotateCamera,
  RoomIconChat,
  RoomButtonChangeFixedParticipant,
  RoomIconChangeFixedParticipant,
} from './Room.styles';

const {width, height} = Dimensions.get('window');
const AnimatedParticipantPanGestureHandle = Animated.createAnimatedComponent(
  RoomWrapperMiniatureParticipants,
);

interface RoomProps {
  navigation: any;
  route: any;
  onMoveAnd: () => any;
  onMoveEnd?: () => void;
  size: number;
  percentage?: number;
  children: React.ReactNode;
}

interface ParticipantProp {
  sid?: string;
}

interface TrackProp {
  trackSid?: string;
}

interface VideoTrackProp {
  participant?: ParticipantProp;
  track?: TrackProp;
}

interface VideoTrackObjectEntry {
  [key: string]: any;
}

const Room: React.FC<RoomProps> = ({
  navigation,
  route,
  size,
  percentage,
  onMoveAnd,
  children,
}) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  // const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('disconnected');
  const [videoTracks, setVideoTracks] = useState<VideoTrackObjectEntry>(
    new Map(),
  );
  const [fixedLocalCamera, setFixedLocalCamera] = useState<boolean>(false);
  const twilioRef = useRef(null);

  const onRoomConnect = () => setStatus('connected');
  const onRoomDisconnect = () => setStatus('disconnected');
  const onRoomFailToConnect = () => setStatus('disconnected');
  const onParticipantAddedVideoTrack = ({
    participant,
    track,
  }: VideoTrackProp) => {
    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track?.trackSid,
          {participantSid: participant?.sid, videoTrackSid: track?.trackSid},
        ],
      ]),
    );
    console.log(
      new Map([
        ...videoTracks,
        [
          track?.trackSid,
          {participantSid: participant?.sid, videoTrackSid: track?.trackSid},
        ],
      ]),
    );
  };

  const onParticipantRemovedVideoTrack = ({
    participant,
    track,
  }: VideoTrackProp) => {
    const videoTracksLocal = videoTracks;
    videoTracksLocal.delete(track?.trackSid);
    setVideoTracks(videoTracksLocal);
  };

  // Handle Events
  const handleFlipCamera = () => twilioRef.current.flipCamera();
  const handleDisconnectCall = () => {
    twilioRef.current.disconnect();
    navigation.replace('OnBoarding');
  };

  const _onMuteButtonPress = () => {
    twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled: boolean) => setIsAudioEnabled(isEnabled));
  };

  useEffect(() => {
    if (route?.params?.roomToken && route?.params?.roomName) {
      twilioRef?.current?.connect({
        roomName: route?.params?.roomName,
        accessToken: route?.params?.roomToken,
        enableNetworkQualityReporting: true,
        dominantSpeakerEnabled: true,
      });
    }
    setStatus('connect');
  }, [navigation, route?.params]);

  const BOX_SIZE = size || 130;
  const Y_PERCANTAGE = percentage || 0;
  let view_height = height;
  let view_width = width;
  let view_start_y = 0;
  let view_start_x = 0;
  let view_end_x = width;
  let view_end_y = height;
  let current_position_x = width - BOX_SIZE / 2;
  let current_position_y = height / 2;

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        onMoveAnd ? onMoveAnd() : null;
        let current_x = pan.x._value;
        let current_y = pan.y._value;
        if (current_position_y + current_y <= height * Y_PERCANTAGE) {
          let top_y = -(current_position_y - view_start_y) + BOX_SIZE / 2;
          if (current_position_x + current_x + BOX_SIZE / 2 > view_end_x) {
            // Right-Top corrner
            let right_x = view_end_x - BOX_SIZE / 2 - current_position_x;
            current_position_x = view_end_x - BOX_SIZE / 2;
            current_position_y = BOX_SIZE / 2 + view_start_y;
            pan.setValue({x: right_x, y: top_y});
          } else if (
            current_position_x + current_x - BOX_SIZE / 2 <
            view_start_x
          ) {
            // Left-Top Corrner
            let left_x = -current_position_x + view_start_x + BOX_SIZE / 2;
            current_position_x = BOX_SIZE / 2 + view_start_x;
            current_position_y = BOX_SIZE / 2 + view_start_y;
            pan.setValue({x: left_x, y: top_y});
          } else {
            // No corner
            current_position_y = BOX_SIZE / 2 + view_start_y;
            current_position_x += current_x;
            pan.setValue({x: current_x, y: top_y});
          }
        } else if (
          current_position_y + current_y >=
          height * (1 - Y_PERCANTAGE)
        ) {
          let bottom_y = view_end_y - current_position_y - BOX_SIZE / 2;
          if (current_position_x + current_x + BOX_SIZE / 2 > view_end_x) {
            // Right-Bottom corrner
            let right_x = view_end_x - BOX_SIZE / 2 - current_position_x;
            current_position_x = view_end_x - BOX_SIZE / 2;
            current_position_y = view_end_y - BOX_SIZE / 2;
            pan.setValue({x: right_x, y: bottom_y});
          } else if (
            current_position_x + current_x - BOX_SIZE / 2 <
            view_start_x
          ) {
            let left_x = -current_position_x + view_start_x + BOX_SIZE / 2;
            current_position_x = BOX_SIZE / 2 + view_start_x;
            current_position_y = view_end_y - BOX_SIZE / 2;
            pan.setValue({x: left_x, y: bottom_y});
          } else {
            current_position_y = view_end_y - BOX_SIZE / 2;
            current_position_x += current_x;
            pan.setValue({x: current_x, y: bottom_y});
          }
        } else if (current_position_x + current_x >= view_width / 2) {
          let right_x = view_end_x - BOX_SIZE / 2 - current_position_x;
          current_position_x = view_end_x - BOX_SIZE / 2;
          current_position_y += current_y;
          pan.setValue({x: right_x, y: current_y});
        } else if (current_position_x + current_x < width / 2) {
          let left_x = -current_position_x + view_start_x + BOX_SIZE / 2;
          current_position_x = BOX_SIZE / 2 + view_start_x;
          current_position_y += current_y;
          pan.setValue({x: left_x, y: current_y});
        }
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <RoomContainer>
      <View
        style={styles.container}
        onLayout={e => {
          view_height = e.nativeEvent.layout.height - 20;
          view_width = e.nativeEvent.layout.width - 20;
          view_start_x = e.nativeEvent.layout.x;
          view_start_y = e.nativeEvent.layout.y;
          view_end_x = view_start_x + view_width;
          view_end_y = view_start_y + view_height;
          current_position_x = view_end_x - BOX_SIZE / 2;
          current_position_y = view_height / 2 + view_start_y;
        }}>
        <TwilioVideo
          ref={twilioRef}
          onRoomDidConnect={onRoomConnect}
          onRoomDidDisconnect={onRoomDisconnect}
          onRoomDidFailToConnect={onRoomFailToConnect}
          onParticipantAddedVideoTrack={onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={onParticipantRemovedVideoTrack}
        />
        {children}
        <RoomWrapperParticipantFixed>
          {Array.from(videoTracks).length !== 1 ? (
            <TwilioVideoLocalView enabled={true} style={{flex: 1}} />
          ) : (
            <>
              {fixedLocalCamera ? (
                <TwilioVideoLocalView enabled={true} style={{flex: 1}} />
              ) : (
                Array.from(videoTracks, ([trackSid, trackIdentifier]) => (
                  <TwilioVideoParticipantView
                    style={{flex: 1}}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                ))
              )}
            </>
          )}
        </RoomWrapperParticipantFixed>

        {Array.from(videoTracks).length !== 1 ? null : (
          <AnimatedParticipantPanGestureHandle
            style={[
              {
                width: BOX_SIZE,
                height: BOX_SIZE,
                transform: [{translateX: pan.x}, {translateY: pan.y}],
                position: 'absolute',
                right: 0,
                zIndex: 2,
              },
              styles.containerPanGesture,
            ]}
            {...panResponder.panHandlers}>
            <RoomButtonChangeFixedParticipant
              onPress={() => setFixedLocalCamera(!fixedLocalCamera)}>
              <RoomIconChangeFixedParticipant />
            </RoomButtonChangeFixedParticipant>
            {!fixedLocalCamera ? (
              <TwilioVideoLocalView
                enabled={true}
                style={styles.containerPanGesture}
              />
            ) : (
              Array.from(videoTracks, ([trackSid, trackIdentifier]) => (
                <TwilioVideoParticipantView
                  style={styles.containerPanGesture}
                  key={trackSid}
                  trackIdentifier={trackIdentifier}
                />
              ))
            )}
          </AnimatedParticipantPanGestureHandle>
        )}
      </View>
      <RoomWrapperActions>
        <RoomActionButton>
          <RoomIconChat />
        </RoomActionButton>
        <RoomActionButton onPress={() => handleFlipCamera()}>
          <RoomIconRotateCamera />
        </RoomActionButton>
        <RoomActionButton onPress={() => _onMuteButtonPress()}>
          {isAudioEnabled ? <RoomIconMic /> : <RoomIconMicOff />}
        </RoomActionButton>
        <RoomActionButton
          onPress={() => handleDisconnectCall()}
          background={'#e5383b'}>
          <RoomIconDisconnectCall />
        </RoomActionButton>
      </RoomWrapperActions>
    </RoomContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPanGesture: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
});

export default Room;
