import { View, Text } from 'react-native';

const QuestionListItem = ({ item, index }: any) => {
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
};

export default QuestionListItem;
