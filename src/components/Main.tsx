import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../pages/HomeScreen';
import AppBar from './AppBar';
import AppHeader from './AppHeader';
import { Route, Routes } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const Main = () => {
  return (
    <LinearGradient colors={['#002655', '#000000']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          {/* <Route path='/signin' element={<Login />} /> */}
        </Routes>
        <AppBar />
      </View>
    </LinearGradient>
  );
};

export default Main;
