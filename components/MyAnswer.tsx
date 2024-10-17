import { View, Text, StyleSheet } from 'react-native';

const MyAnswer = () => {
  return (
    <View style={styles.container}>
      <Text>my answer</Text>
    </View>
  );
};

export default MyAnswer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
