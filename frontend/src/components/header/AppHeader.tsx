import {StyleSheet, Text, View} from 'react-native';


const AppHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Visao Texture Models</Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4a69bd',
    paddingTop: 15,
    paddingBottom: 15,
    width: '100%',
    justifyContent: 'center',
  },
  headerText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
