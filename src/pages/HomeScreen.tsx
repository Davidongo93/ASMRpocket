import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, PanResponder } from 'react-native';
import TrackList from '../components/TrackList';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';
import { Action } from 'redux'; // Asegúrate de importar correctamente el tipo Action
import { getTracks, selectTrack } from '../redux/actions';
import { State } from '../redux/reducer';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BottomModal, ModalContent } from 'react-native-modals';
import { Audio } from 'expo-av';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const progressBarWidthRef = useRef<number>(0);
  const progressBarXRef = useRef<number>(0);
  const progressBarXRefff54 = useRef<number>(0);

  const dispatch = useDispatch<ThunkDispatch<State, null, Action>>();

  const tracks = useSelector((state: State) => state.allTracks);
  const currentTrack = useSelector((state: State) => state.selectedTrack);

  useEffect(() => {
    dispatch(getTracks());
  }, [dispatch]);

  useEffect(() => {
    const trackIndex = tracks.findIndex((track) => track.title === currentTrack?.title);
    setCurrentTrackIndex(trackIndex);
  }, [currentTrack, tracks]);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      playTrack(currentTrackIndex);
    }
  }, [currentTrackIndex]);

  const playTrack = async (currentTrackIndex: number) => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    try {
      if (currentTrackIndex >= 0 && currentTrackIndex < tracks.length) {
        const currentTrack = tracks[currentTrackIndex];
        const audioURL = currentTrack?.audio;

        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: false,
        });

        const { sound, status } = await Audio.Sound.createAsync(
          {
            uri: audioURL || '',
          },
          {
            shouldPlay: true,
            isLooping: false,
          },
          onPlaybackStatusUpdate
        );

        onPlaybackStatusUpdate(status);
        setCurrentSound(sound);
        setIsPlaying(status.isLoaded);
        console.log(currentTrackIndex);
      } else {
        console.log('Invalid track index');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded && status.isPlaying) {
      const progress = status.positionMillis / status.durationMillis;
      setProgress(progress);
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }
    if (status.didJustFinished === true) {
      setCurrentSound(null);
      await playNextTrack();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }

    if (currentTrackIndex !== null && currentTrackIndex + 1 < tracks.length) {
      const nextTrackIndex = currentTrackIndex + 1;
      const nextTrack = tracks[nextTrackIndex];
      dispatch(selectTrack(nextTrack));
    } else {
      console.log('End of playlist');
    }
  };

  const playPreviousTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    if (currentTrackIndex !== null && currentTrackIndex - 1 >= 0 && currentTrackIndex - 1 < tracks.length) {
      const nextTrackIndex = currentTrackIndex - 1;
      const nextTrack = tracks[nextTrackIndex];
      dispatch(selectTrack(nextTrack));
    } else {
      console.log('Beginning of playlist');
    }
  };

  const onTouchStartProgressBar = () => {
    setDragging(true);
  };

  const onTouchEndProgressBar = () => {
    setDragging(false);
  };

  const onLayoutProgressBar = (e) => {
    // Almacena la anchura de la progressBar cuando cambia el diseño
    progressBarWidthRef.current = e.nativeEvent.layout.width;
  };

  const onTouchMoveProgressBar = (e) => {
    if (dragging && currentSound) {
      const progressBarWidth = progressBarWidthRef.current; // Obtén la anchura almacenada
      const touchX = e.nativeEvent.locationX;
      const newProgress = touchX / progressBarWidth;
      const newTime = newProgress * totalDuration;

      // Asegúrate de que newTime sea un número válido y esté dentro de los límites
      if (!isNaN(newTime) && newTime >= 0 && newTime <= totalDuration) {
        currentSound.setPositionAsync(newTime);
        setCurrentTime(newTime);
      }
    }
  };

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
            <Pressable onPress={handlePlayPause}>
              {isPlaying ? (
                <AntDesign name='pausecircle' size={32} color='white' style={{ marginLeft: 10 }} />
              ) : (
                <Pressable
                  onPress={() => {
                    if (currentTrackIndex !== null) {
                      playTrack(currentTrackIndex);
                    } else {
                      console.log('No track selected');
                    }
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Ionicons name='play-circle-outline' size={32} color='white' />
                </Pressable>
              )}
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
                <View
                  style={{
                    width: '100%',
                    marginTop: 10,
                    height: 3,
                    backgroundColor: 'gray',
                    borderRadius: 5,
                  }}
                  onTouchStart={onTouchStartProgressBar}
                  onTouchEnd={onTouchEndProgressBar}
                  onLayout={onLayoutProgressBar}
                  onTouchMove={onTouchMoveProgressBar}
                >
                  <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                  <View
                    style={[
                      {
                        position: 'absolute',
                        top: -5,
                        width: 12,
                        height: 12,
                        borderRadius: 12 / 2,
                        backgroundColor: 'white',
                      },
                      {
                        left: `${progress * 100}%`,
                        marginLeft: -12 / 2,
                      },
                    ]}
                  />
                </View>
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 15 }}>{formatTime(currentTime)}</Text>
                  <Text style={{ color: 'white', fontSize: 15 }}>{formatTime(totalDuration)}</Text>
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
                  <Pressable onPress={playPreviousTrack}>
                    <Ionicons name='play-skip-back' size={30} color='white' />
                  </Pressable>
                  <Pressable onPress={handlePlayPause}>
                    {isPlaying ? (
                      <AntDesign name='pausecircle' size={60} color='white' />
                    ) : (
                      <Pressable
                        onPress={() => {
                          if (currentTrackIndex !== null) {
                            playTrack(currentTrackIndex);
                          } else {
                            console.log('No track selected');
                          }
                        }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          backgroundColor: 'transparent',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Ionicons name='play-circle-outline' size={60} color='white' />
                      </Pressable>
                    )}
                  </Pressable>
                  <Pressable onPress={playNextTrack}>
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
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
  },
});

export default HomeScreen;
