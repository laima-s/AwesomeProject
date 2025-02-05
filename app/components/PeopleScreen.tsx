import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import DataScreen from '../screen/DataScreen';
import { Person } from '../types';

const renderItem = ({ item }: { item: Person }) => {
  const handlePress = () => {
    const url = `https://starwars.fandom.com/wiki/${item.name.replace(' ', '_')}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetail}>Height: <Text style={styles.itemDetailValue}>{item.height}</Text></Text>
      <Text style={styles.itemDetail}>Mass: <Text style={styles.itemDetailValue}>{item.mass}</Text></Text>
    </TouchableOpacity>
  );
};

const PeopleScreen = () => {
  return (
    <DataScreen
      endpoint="people"
      renderItem={renderItem}
      backgroundImage={require('../assets/images/starwars-background.jpg')}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'yellow',
  },
  itemName: {
    fontFamily: 'Starjout',
    fontSize: 24,
    color: 'yellow',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemDetail: {
    fontFamily: 'Starjhol',
    fontSize: 18,
    color: 'yellow',
    textAlign: 'center',
  },
  itemDetailValue: {
    fontFamily: 'Starjhol',
    fontSize: 18,
    color: 'white',
  },
});

export default PeopleScreen;
