import {SafeAreaView, StyleSheet} from 'react-native';
import SearchPage from "./pages/search/SearchPage";
import AppHeader from "./components/header/AppHeader";
import AppFooter from "./components/footer/AppFooter";

function App() {

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader/>
      <SearchPage/>
      <AppFooter/>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    marginBottom: 16,
  },
  container: {
    backgroundColor: '#F0F0F0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },
});

