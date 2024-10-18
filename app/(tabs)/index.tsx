import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  View,
  Text,
  Alert,
} from 'react-native';
import { supabase } from '@/utils/supabase';
import React, { useEffect, useState } from 'react';
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

import { FlashList } from '@shopify/flash-list';
import QuestionListItem from '@/components/QuestionListItem';
import Header from '@/components/Header';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);

  const getQuestion = async () => {
    try {
      const res = await supabase.from('question').select();
      const { data, error, statusText } = res;
      console.log(res);
      if (data && data.length) {
        setList(data);
      }
    } catch (e) {
      Alert.alert('ERROR');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getQuestion();
  }, []);

  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }>
    //   <ThemedView style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit <ThemedText type="defaultSemiBold">app/(tabs)/login.tsx</ThemedText> to see changes.
    //       Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //     <ThemedText>
    //       Tap the Explore tab to learn more about what's included in this starter app.
    //     </ThemedText>
    //   </ThemedView>
    //   <ThemedView style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       When you're ready, run{' '}
    //       <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </ThemedView>
    // </ParallaxScrollView>

    //   const colorsValue = useSharedValue(1);
    //   const skiaFirstColor = useValue(0);
    //   const skiaSecondColor = useValue(0);
    //
    //   useSharedValueEffect(() => {
    //     skiaFirstColor.current = interpolateColor(colorsValue.value, [0, 1], ['#FFFFFF', '#000000']);
    //     skiaSecondColor.current = interpolateColor(colorsValue.value, [0, 1], ['#FFFFFF', '#00ff00']);
    //   }, colorsValue); // you can pass other shared values as extra parameters
    //
    //   const colors = useComputedValue(() => {
    //     return [skiaFirstColor.current, skiaSecondColor.current]
    //   }, [skiaFirstColor, skiaSecondColor])
    //
    //   return (<...
    //   <Canvas>
    //     <LinearGradient colors={colors} />
    //   </Canvas>
    // </>)

    <View style={styles.container}>
      <Header />
      <LinearGradient
        // Background Linear Gradient
        colors={['#aad3f8', 'pink', 'lightblue', 'lightyellow']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: '100%' }}
      >
        <FlashList
          onRefresh={() => {
            setLoading(true);
            getQuestion();
          }}
          refreshing={loading}
          estimatedItemSize={100}
          data={list}
          renderItem={({ item, index }) => (
            <QuestionListItem item={item} index={index} />
          )}
          // ListEmptyComponent={
          //
          // }
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#eee',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
