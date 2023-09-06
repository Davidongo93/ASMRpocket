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
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomModal, ModalContent } from 'react-native-modals';

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
      <LinearGradient colors={['#282D4E', '#202123']} style={{ flex: 1 }}>
        <AppHeader />
        <TrackList />
      </LinearGradient>
      {currentTrack && (
        <Pressable style={styles.playerContainer} onPress={() => setModalVisible(!modalVisible)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Image source={{ uri: currentTrack.image }} style={styles.image} />
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>
              {currentTrack.title}
            </Text>
          </View>
          <View>
            <Pressable>
              <Ionicons name='play-circle-outline' size={32} color='rgba(60, 104, 223, 1)' />
              {/* <AntDesign name="pausecircle" size={24} color="black" /> */}
            </Pressable>
          </View>
        </Pressable>
      )}
      <BottomModal
        visible={modalVisible}
        onHardwareBackPress={() => setModalVisible(false)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
      >
        <ModalContent style={{ height: '100%', width: '100%', backgroundColor: '#5072A7' }}>
          <View style={{ height: '100%', width: '100%', marginTop: 40 }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <AntDesign onPress={() => setModalVisible(!modalVisible)} name='down' size={24} color='white' />
              <Text style={styles.modalCategory}>{currentTrack?.category}</Text>
              <Entypo name='dots-three-vertical' size={24} color='white' />
            </Pressable>
            <View style={{ padding: 10 }}>
              <Image source={{ uri: currentTrack?.image }} style={styles.modalImage} />
              <View>
                <Text style={styles.modalTitle}>{currentTrack?.title}</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text>ProgessBar</Text>
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 15 }}>0:00</Text>
                  <Text style={{ color: 'white', fontSize: 15 }}>0:20</Text>
                </View>
                <View
                  style={{
                    marginTop: 17,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 50,
                  }}
                >
                  <Pressable>
                    <Ionicons name='play-skip-back' size={30} color='white' />
                  </Pressable>
                  <Pressable>
                    <AntDesign name='pausecircle' size={60} color='white' />
                  </Pressable>
                  <Pressable>
                    <Ionicons name='play-skip-forward' size={30} color='white' />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
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
    justifyContent: 'space-between',
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    color: 'white',
    fontSize: 12,
    maxWidth: 250,
  },

  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalCategory: {
    color: '#FF7EE3',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 14,
  },
  modalImage: {
    width: '100%',
    height: 350,
    borderRadius: 4,
    marginTop: 90,
  },
});

export default HomeScreen;
