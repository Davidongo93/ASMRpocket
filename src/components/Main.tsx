import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TrackList from './TrackList';
import AppBar from './AppBar';
import AppHeader from './AppHeader';
import { Route, Routes } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#002655',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<TrackList />} />
        {/* <Route path='/signin' element={<Login />} /> */}
      </Routes>
      <AppBar />
    </View>
  );
};

export default Main;