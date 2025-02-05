import React from 'react';
import { Image, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PeopleScreen from './app/components/PeopleScreen';
import PlanetsScreen from './app/components/PlanetsScreen';
import SpaceshipsScreen from './app/components/SpaceshipsScreen';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'black',
            text: 'yellow',
          },
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="black" />

        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconSource: any;
              let testID: string;

              if (route.name === 'People') {
                iconSource = require('./app/assets/images/people-icon.png');
                testID = 'People-icon';
              } else if (route.name === 'Planets') {
                iconSource = require('./app/assets/images/planet_icon.png');
                testID = 'Planets-icon';
              } else if (route.name === 'Spaceships') {
                iconSource = require('./app/assets/images/spaceship_icon.png');
                testID = 'Spaceships-icon';
              }
              
              return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} testID={testID} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: 'black',
            },
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: 'yellow',
            },
          })}
        >
          <Tab.Screen name="People" component={PeopleScreen} />
          <Tab.Screen name="Planets" component={PlanetsScreen} />
          <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
