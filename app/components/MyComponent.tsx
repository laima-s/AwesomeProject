import React, { useEffect } from 'react';
import { View, Text, NativeEventEmitter, NativeModules, StyleSheet } from 'react-native';

const { MyNativeModule } = NativeModules;
const eventEmitter = new NativeEventEmitter(MyNativeModule);

const MyComponent = () => {
  useEffect(() => {
    // Add an event listener
    const subscription = eventEmitter.addListener('event', (event) => {
      console.log('Event received:', event);
    });

    // Trigger the event (example)
    MyNativeModule.triggerEvent();

    // Clean up the event listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default MyComponent;