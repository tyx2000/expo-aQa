import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, Fragment } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import ExpandButton from '@/components/askButton/ExpandButton';

const AskButton = () => {
  const [expand, setExpand] = useState(false);

  const onAskPress = async () => {
    if (expand) {
      setExpand(false);
    } else {
      const token = await SecureStore.getItemAsync('token');
      console.log(token);
      router.push(token ? '/editQuestion' : '/login');
    }
  };

  const onAskLongPress = async () => {
    setExpand(true);
  };

  return (
    <Fragment>
      <TouchableOpacity
        style={[
          styles.ask,
          {
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
      <ExpandButton
        iconName="image"
        expand={expand}
        endOffsetX={-75}
        endOffsetY={-75}
      />
      <ExpandButton expand={expand} iconName="mic" endOffsetX={-100} />
      <ExpandButton
        expand={expand}
        iconName="pencil-outline"
        endOffsetY={-100}
      />
    </Fragment>
  );
};

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

export default AskButton;
