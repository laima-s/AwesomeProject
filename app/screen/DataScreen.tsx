import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, ImageBackground, ImageSourcePropType } from 'react-native';
import useFetch from '../hooks/useFetch';
import { Person, Spaceship, Planet } from '../types';

interface DataScreenProps<T> {
  endpoint: string;
  renderItem: ({ item }: { item: T }) => JSX.Element;
  backgroundImage?: ImageSourcePropType;
}

const DataScreen = <T extends Person | Spaceship | Planet>({ endpoint, renderItem, backgroundImage }: DataScreenProps<T>) => {
  const { data, isLoading, error } = useFetch<T>(endpoint);
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="black" testID="ActivityIndicator" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: {error.message}</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={data?.results.filter((item: T) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {renderItem({ item })}
            </View>
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.flatListContent}
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
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 187, 0.7)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    fontFamily: 'Starjout',
    fontSize: 18,
    color: 'pink',
    textAlign: 'center',
  },
  searchInput: {
    fontFamily: 'Starjout',
    fontSize: 18,
    borderWidth: 2,
    borderColor: 'yellow',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 40,
    width: '100%',
    color: 'black',
    backgroundColor: 'lightyellow',
    textAlign: 'left',
  },
  flatListContent: {
    flexGrow: 1,
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

export default DataScreen;