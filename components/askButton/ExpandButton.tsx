import { StyleSheet, TouchableOpacity } from 'react-native';
import ReAnimated, {
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

const ReAnimatedTouchableOpacity =
  ReAnimated.createAnimatedComponent(TouchableOpacity);

export default function ExpandButton({
  expand,
  iconName,
  endOffsetX = 0,
  endOffsetY = 0,
}: {
  expand: boolean;
  iconName: any;
  endOffsetX?: number;
  endOffsetY?: number;
}) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(expand ? 1 : 0);
    scale.value = withTiming(expand ? 1 : 0);
    offsetX.value = withTiming(expand ? endOffsetX : 0);
    offsetY.value = withTiming(expand ? endOffsetY : 0);
  }, [expand]);

  return (
    <ReAnimatedTouchableOpacity
      style={[
        styles.ask,
        {
          transform: [
            { translateX: offsetX },
            { translateY: offsetY },
            { scale },
          ],
        },
      ]}
    >
      <Ionicons name={iconName} size={30} color="#0601b4" />
    </ReAnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ask: {
    width: 50,
    height: 50,
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
