import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DataScreen from '../screen/DataScreen';
import { Spaceship } from '../types';

const renderItem = ({ item }: { item: Spaceship }) => (
  <View>
    <Text style={styles.item}>{item.name}</Text>
    <Text style={styles.details}>Model: {item.model}</Text>
    <Text style={styles.details}>Manufacturer: {item.manufacturer}</Text>
  </View>
);

const SpaceshipsScreen = () => (
  <DataScreen
    endpoint="starships"
    renderItem={renderItem}
    backgroundImage={require('../assets/images/starwars-background.jpg')}
  />
);

const styles = StyleSheet.create({
  item: {
    fontFamily: 'Starjout',
    fontSize: 24,
    padding: 20,
    color: 'yellow',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    fontFamily: 'Starjhol',
    fontSize: 18,
    padding: 5,
    color: 'yellow',
    textAlign: 'center',
  },
});

export default SpaceshipsScreen;
