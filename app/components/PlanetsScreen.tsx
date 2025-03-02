import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import DataScreen from '../screen/DataScreen';
import { Planet } from '../types';

const renderItem = ({ item }: { item: Planet }) => {
  const handlePress = () => {
    const url = `https://starwars.fandom.com/wiki/${item.name.replace(' ', '_')}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetail}>Climate: <Text style={styles.itemDetailValue}>{item.climate}</Text></Text>
      <Text style={styles.itemDetail}>Population: <Text style={styles.itemDetailValue}>{item.population}</Text></Text>
    </TouchableOpacity>
  );
};

const PlanetsScreen = () => {
  return (
    <DataScreen
      endpoint="planets"
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

export default PlanetsScreen;