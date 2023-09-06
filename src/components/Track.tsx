import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Audio } from 'expo-av';
import { useDispatch } from 'react-redux';
import { selectTrack } from '../redux/actions';
import StyledText from './StyledText';

interface TrackProps {
  title: string;
  audioUrl: string;
  image: string;
  category: string;
}

const Track: React.FC<TrackProps> = ({ title, audioUrl, image, category }) => {
  const dispatch = useDispatch();
  const playSound = async () => {
    dispatch(selectTrack({ title, audio: audioUrl, image, category }));
  };
  return (
    <TouchableOpacity onPress={playSound}>
      <View style={styles.trackContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 70, // Ajusta el ancho y el alto según sea necesario
    height: 70,
    borderRadius: 4,
  },
  textContainer: {
    marginLeft: 10, // Añade margen izquierdo para separar la imagen del texto
    marginTop: 10,
    flex: 1, // Hace que el contenedor de texto ocupe todo el espacio disponible
    flexWrap: 'wrap', // Permite que el texto se divida en varias líneas cuando sea necesario
  },
  title: {
    color: 'white',
  },
  category: {
    color: '#FF7EE3',
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: '800',
  },
});

export default Track;
