import React from 'react';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppLoading from 'expo-app-loading';
import StackNavigator from './src/components/StackNavigator';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [fontsLoaded] = useFonts({
    Devonshire: require('./assets/fonts/Devonshire-Regular.ttf'), // Reemplaza con la ruta correcta al archivo de la fuente
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <Provider store={store}>
        <StatusBar style='light' />
        <StackNavigator />
      </Provider>
    </>
  );
}
