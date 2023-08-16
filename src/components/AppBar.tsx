import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import StyledText from './StyledText';
import theme from '../theme';
import { Link, useLocation } from 'react-router-native';

const AppBarTab = ({ children, to }: { children: React.ReactNode; to: string }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  const containerStyles = StyleSheet.compose(styles.tabContainer, active && styles.activeTabContainer);

  return (
    <Link to={to} style={containerStyles}>
      <StyledText
        fontWeight='bold'
        style={styles.text}
        align='center' // Agrega esto si es necesario
        color='primary' // Agrega esto si es necesario
        fontSize='subheading' // Agrega esto si es necesario
      >
        {children}
      </StyledText>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab to={'/signin'}>Search</AppBarTab>
      <AppBarTab to={'/'}>Home</AppBarTab>
      <AppBarTab to={'/profile'}>Profile</AppBarTab>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.appBar.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
  text: {
    color: theme.appBar.secondaryText,
    paddingHorizontal: 10,
  },
  tabContainer: {
    width: 100, // Agrega el ancho específico que desees
  },
  activeTabContainer: {
    color: theme.appBar.primaryText,
  },
});

export default AppBar;
