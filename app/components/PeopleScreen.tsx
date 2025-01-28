import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, TextInput, FlatList } from 'react-native';
import DataScreen from '../screen/DataScreen';
import { Person } from '../types';
import useFetch from '../hooks/useFetch';

const renderItem = ({ item }: { item: Person }) => (
  <View>
    <Text style={styles.item}>{item.name}</Text>
    <Text style={styles.details}>Height: {item.height}</Text>
    <Text style={styles.details}>Mass: {item.mass}</Text>
  </View>
);

const PeopleScreen = () => {
  const { data, isLoading, error } = useFetch<Person>('people');
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <ImageBackground source={require('../assets/images/starwars-background.jpg')} style={styles.background}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="black" testID="ActivityIndicator" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground source={require('../assets/images/starwars-background.jpg')} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../assets/images/starwars-background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={data?.results.filter((item: Person) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {renderItem({ item })}
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontFamily: 'Starjhol',
    fontSize: 18,
    color: 'yellow',
    textAlign: 'center',
  },
  errorText: {
    fontFamily: 'Starjout',
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  searchInput: {
    fontFamily: 'Starjout',
    fontSize: 18,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
    color: 'yellow',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 16,
  },
  item: {
    fontFamily: 'Starjout',
    fontSize: 24,
    color: 'yellow',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    fontFamily: 'Starjhol',
    fontSize: 18,
    color: 'yellow',
    textAlign: 'center',
  },
});

export default PeopleScreen;
