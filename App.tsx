import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PeopleScreen from './app/components/PeopleScreen';
import PlanetsScreen from './app/components/PlanetsScreen';
import SpaceshipsScreen from './app/components/SpaceshipsScreen';
import { enableScreens } from 'react-native-screens';

// Enable screens for better performance
enableScreens();

const queryClient = new QueryClient();

const Tab = createBottomTabNavigator();

if (__DEV__) {
  require("./ReactotronConfig");
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'black',
          text: 'white',
        },
      }}
    >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: string;
              if (route.name === 'People') {
                iconName = 'ios-people';
              } else if (route.name === 'Planets') {
                iconName = 'ios-planet';
              } else if (route.name === 'Spaceships') {
                iconName = 'ios-rocket';
              } else {
                iconName = 'ios-alert'; // Default icon if none match
              }

              return <Ionicons name={iconName} size={size} color={color} />;
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
              fontWeight: 'bold',
              color: 'white',
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
