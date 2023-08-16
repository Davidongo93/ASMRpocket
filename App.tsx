import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Devonshire: require('./assets/fonts/Devonshire-Regular.ttf'), // Reemplaza con la ruta correcta al archivo de la fuente
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='light' />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </>
  );
}
