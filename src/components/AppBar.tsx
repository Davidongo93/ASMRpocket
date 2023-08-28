import React from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import StyledText from './StyledText';
import theme from '../theme';
import { Link, useLocation, useNavigate } from 'react-router-native';
import { Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';

const AppBarTab = ({ children, to }: { children: React.ReactNode; to: string }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const containerStyles = styles.tabContainer;

  const handlePress = () => {
    navigate(to);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={containerStyles}>
        <StyledText
          fontWeights='bold'
          style={styles.text}
          align='center'
          color='primary'
          fontSize='subheading'
        >
          {children}
        </StyledText>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AppBar = () => {
  const { pathname } = useLocation();

  return (
    <View style={styles.container}>
      <AppBarTab to={'/search'}>
        <Ionicons name='search' size={24} color={pathname === '/search' ? 'red' : 'white'} />
      </AppBarTab>
      <AppBarTab to={'/'}>
        <Entypo name='home' size={24} color={pathname === '/' ? 'red' : 'white'} />
      </AppBarTab>
      <AppBarTab to={'/profile'}>
        <FontAwesome name='user' size={24} color={pathname === '/profile' ? 'red' : 'white'} />
      </AppBarTab>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
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
    color: theme.appBar.primary,
  },
});

export default AppBar;
