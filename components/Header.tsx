import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ReAnimated, {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export default function () {
  const borderRadius = useSharedValue(10);
  const backgroundColor = useSharedValue('#aad3f8');

  return (
    <View style={[styles.container]}>
      <View style={styles.logo}>
        <Ionicons size={40} name="logo-amplify" color="#1e7ed4" />
      </View>
      <ReAnimated.View
        style={[styles.search, { borderRadius, backgroundColor }]}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Touch To Search"
          placeholderTextColor="#1e7ed4"
          onFocus={() => {
            borderRadius.value = withSpring(25);
            backgroundColor.value = withTiming('#1e7ed4');
          }}
          onBlur={() => {
            borderRadius.value = withSpring(10);
            backgroundColor.value = withTiming('#aad3f8');
          }}
        />
        <View style={styles.searchIcon}>
          <Ionicons size={20} name="search" color="purple" />
        </View>
      </ReAnimated.View>
      <View style={styles.logo}>
        <Ionicons size={30} name="notifications-outline" color="#1e7ed4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },
  logo: {
    width: 45,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
  },
  searchIcon: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
