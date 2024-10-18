import React, { Fragment, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import ReAnimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const ReAnimatedTouchableOpacity =
  ReAnimated.createAnimatedComponent(TouchableOpacity);

export default function AskButton({}) {
  const [expand, setExpand] = useState(false);

  const opacity = useSharedValue(0);
  const offset = useSharedValue(0);
  const scale = useSharedValue(0);

  const onAskPress = async () => {
    if (expand) {
      setExpand(false);
      opacity.value = withTiming(0);
      offset.value = withTiming(0);
      scale.value = withTiming(0);
    } else {
      const token = await SecureStore.getItemAsync('token');
      console.log(token);
      router.push(token ? '/editQuestion' : '/login');
    }
  };

  const onAskLongPress = async () => {
    setExpand(true);

    opacity.value = withTiming(1);
    offset.value = withTiming(-100);
    scale.value = withTiming(1);
  };

  return (
    <Fragment>
      <TouchableOpacity
        style={[
          styles.ask,
          {
            opacity: expand ? 0.8 : 1,
            transform: [{ scale: expand ? 0.8 : 1 }],
          },
        ]}
        onPress={onAskPress}
        onLongPress={onAskLongPress}
      >
        <Ionicons
          name={expand ? 'close' : 'pencil-outline'}
          size={30}
          color="#0601b4"
        />
      </TouchableOpacity>
      <ReAnimatedTouchableOpacity
        style={[
          styles.ask,
          {
            opacity,
            transform: [{ translateX: offset }, { scale }],
          },
        ]}
      >
        <Ionicons name="mic" size={30} color="#0601b4" />
      </ReAnimatedTouchableOpacity>
      <ReAnimatedTouchableOpacity
        style={[
          styles.ask,
          {
            opacity,
            transform: [
              { translateX: offset },
              { translateY: offset },
              { scale },
            ],
          },
        ]}
      >
        <Ionicons name="image" size={30} color="#0601b4" />
      </ReAnimatedTouchableOpacity>
      <ReAnimatedTouchableOpacity
        style={[
          styles.ask,
          {
            display: expand ? 'flex' : 'none',
            opacity,
            transform: [{ translateY: offset }, { scale }],
          },
        ]}
      >
        <Ionicons name="pencil-outline" size={30} color="#0601b4" />
      </ReAnimatedTouchableOpacity>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  ask: {
    width: 60,
    height: 60,
    backgroundColor: '#aad3f8',
    right: 20,
    bottom: 20,
    borderRadius: 30,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
