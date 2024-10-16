import { View, TextInput, StyleSheet } from 'react-native';

export default function ({}) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}></View>
      <View style={styles.search}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <View style={styles.searchIcon}></View>
      </View>
      <View style={styles.logo}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#eee',
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
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  search: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
  },
  searchIcon: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
});
