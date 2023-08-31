import { View, Text, StyleSheet } from 'react-native';
import TrackList from '../components/TrackList';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#002655', '#000000']} style={{ flex: 1 }}>
        <AppHeader />
        <TrackList></TrackList>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
  },
});

export default HomeScreen;
