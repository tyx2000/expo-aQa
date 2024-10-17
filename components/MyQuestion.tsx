import { View, Text, StyleSheet } from 'react-native';

const MyQuestion = () => {
  return (
    <View style={styles.container}>
      <Text>my question</Text>
    </View>
  );
};

export default MyQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
