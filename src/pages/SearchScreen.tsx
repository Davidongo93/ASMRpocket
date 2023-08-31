import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../components/AppHeader';

const SearchScreen = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (text: string) => {
    setInput(text);
  };

  return (
    <LinearGradient colors={['#002655', '#000000']} style={{ flex: 1 }}>
      <AppHeader />
      <Pressable
        style={{
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 9,
        }}
      >
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: '#42275a',
            padding: 9,
            flex: 1,
            borderRadius: 3,
            height: 38,
          }}
        >
          <AntDesign name='search1' size={20} color='white' />
          <TextInput
            value={input}
            onChangeText={(text) => handleInputChange(text)}
            placeholder='Search...'
            placeholderTextColor={'white'}
            style={{ fontWeight: '500', color: 'white' }}
          />
        </Pressable>
        <Pressable
          style={{
            marginHorizontal: 10,
            backgroundColor: '#42275a',
            padding: 10,
            borderRadius: 3,
            height: 38,
          }}
        >
          <Text style={{ color: 'white' }}>Sort</Text>
        </Pressable>
      </Pressable>
      <ScrollView style={{ flex: 1 }}></ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
});

export default SearchScreen;
