import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DataScreen from '../screen/DataScreen';
import { Planet } from '../types';

const renderItem = ({ item }: { item: Planet }) => (
  <View>
    <Text style={styles.item}>{item.name}</Text>
    <Text style={styles.details}>Climate: {item.climate}</Text>
    <Text style={styles.details}>Population: {item.population}</Text>
  </View>
);

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
  item: {
    fontFamily: 'Starjout',
    fontSize: 24,
    padding: 20,
    color: 'yellow',
  },
  details: {
    fontFamily: 'Starjhol',
    fontSize: 18,
    color: 'yellow',
  },
});

export default PlanetsScreen;