import { View, Text, StyleSheet } from 'react-native';
import TrackList from '../components/TrackList';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TrackList></TrackList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
