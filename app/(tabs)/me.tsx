import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-root-toast';

export default function Me({}) {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <Text>mmmme</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: '#aad3f8',
  },
});
