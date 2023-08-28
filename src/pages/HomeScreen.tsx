import { View, Text, ScrollView } from 'react-native';
import TrackList from '../components/TrackList';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  return (
    <ScrollView>
      <TrackList></TrackList>
    </ScrollView>
  );
};

export default HomeScreen;
