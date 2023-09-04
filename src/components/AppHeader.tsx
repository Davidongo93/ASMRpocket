import React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import theme from '../theme';
import { Link, useLocation } from 'react-router-native';

const AppHeader = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.appBar.primary} />
      <Text style={styles.text}>ASMRpocket</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight + 30, // Utiliza StatusBar.currentHeight para establecer el paddingTop
  },
  text: {
    color: theme.appBar.secondaryText,
    margin: 15,
    fontSize: 30,
    fontFamily: 'Devonshire',
  },
  active: {
    color: theme.appBar.primaryText,
  },
});

export default AppHeader;
