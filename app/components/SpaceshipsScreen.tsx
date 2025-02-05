import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DataScreen from '../screen/DataScreen';
import { Starship } from '../types';

const renderItem = ({ item }: { item: Starship }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemDetail}>Model: <Text style={styles.itemDetailValue}>{item.model}</Text></Text>
    <Text style={styles.itemDetail}>Manufacturer: <Text style={styles.itemDetailValue}>{item.manufacturer}</Text></Text>
  </View>
);

const SpaceshipsScreen = () => {
  return (
    <DataScreen
      endpoint="spaceships"
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

export default SpaceshipsScreen;