import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import StyledText from './StyledText';

interface TrackProps {
  title: string;
  audioUrl: string;
}

const Track: React.FC<TrackProps> = ({ title, audioUrl }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async () => {
    if (!sound) {
      return; // No se puede reproducir si el sonido no se ha cargado
    }

    if (sound.getStatusAsync) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        await sound.stopAsync();
      }
    }

    try {
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio', error);
    }
  };

  const loadSound = async () => {
    const newSound = new Audio.Sound();
    try {
      await newSound.loadAsync({ uri: audioUrl });
      setSound(newSound);
    } catch (error) {
      console.error('Error loading audio', error);
    }
  };

  return (
    <TouchableOpacity onPress={playSound} onLongPress={loadSound}>
      <View style={styles.trackContainer}>
        <StyledText>{title}</StyledText>
      </View>
    </TouchableOpacity>
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

export default Track;
