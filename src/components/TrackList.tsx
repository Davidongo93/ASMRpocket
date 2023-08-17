import { FlatList, View, StyleSheet } from 'react-native';
import Track from './Track';

const TrackList = () => {
  const tracks = [
    { title: 'Flowing River', audioUrl: './assets/tracks/flowing-river.mp3' },
    { title: 'Rain in the Woods', audioUrl: './assets/tracks/rain-in-the-woods.mp3' },
    { title: 'Water Sounds', audioUrl: './assets/tracks/water-sounds.mp3' },
  ];

  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => <Track title={item.title} audioUrl={item.audioUrl} />}
      keyExtractor={(item) => item.title}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    padding: 10,
    backgroundColor: '#EFEFEF',
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
  },
});

export default TrackList;
