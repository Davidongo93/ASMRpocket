import { FlatList, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux'; // Asegúrate de importar correctamente el tipo Action
import { getTracks } from '../redux/actions';
import { State } from '../redux/reducer';
import Track from './Track';

const TrackList = () => {
  const dispatch = useDispatch<ThunkDispatch<State, null, Action>>();

  const tracks = useSelector((state: State) => state.allTracks);

  useEffect(() => {
    dispatch(getTracks());
  }, [dispatch]);

  return (
    <FlatList
      data={tracks}
      renderItem={({ item }) => <Track title={item.title} audioUrl={item.audio} />}
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
