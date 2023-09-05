import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import TrackList from '../components/TrackList';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import { Action } from 'redux'; // Asegúrate de importar correctamente el tipo Action
import { getTracks } from '../redux/actions';
import { State } from '../redux/reducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<State, null, Action>>();

  const tracks = useSelector((state: State) => state.allTracks);
  const currentTrack = useSelector((state: State) => state.selectedTrack);

  useEffect(() => {
    dispatch(getTracks());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#002955', '#000000']} style={{ flex: 1 }}>
        <AppHeader />
        <TrackList />
      </LinearGradient>
      {currentTrack && (
        <Pressable style={styles.playerContainer}>
          <Image source={{ uri: currentTrack.image }} style={styles.image} />
          <View>
            <Text style={styles.title}>{currentTrack.title}</Text>
          </View>
        </Pressable>
      )}
      {/* <BottomModal>
        <ModalContent></ModalContent>
      </BottomModal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
  },
  playerContainer: {
    backgroundColor: '#002955',
    flex: 1,
    width: '90%',
    height: 60,
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 70,
    position: 'absolute',
    borderRadius: 6,
    left: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    color: 'white',
  },
});

export default HomeScreen;
