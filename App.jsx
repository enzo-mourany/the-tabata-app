import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import Countdowns from './src/screens/Countdown';
import Settings from './src/screens/Settings';
import { DurationProvider } from './src/context/DurationContext';
//import AppContainer from './src/components/app-container';

const Stack = createStackNavigator();

// =======================================================================
//                              Main Function
// =======================================================================

export default function App() {
  return (

    <DurationProvider style={styles.main}>
      <NavigationContainer
        style={styles.container}
        independent={true}
      >
        <Stack.Navigator
          initialRouteName='Home'
          style={styles.navigator}
          screenOptions={{
            gestureEnable: true,
            gestureDirection: 'horizontal',
            headerMode: 'float',
          }}
          animation='fade'
        >
          <Stack.Screen
            name='Home'
            component={HomePage}
            options={{
              title: ' ',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#04112A',
              },
            }}
          />
          <Stack.Screen
            name='Countdown'
            component={Countdowns}
            options={{
              title: ' ',
              headerStyle: {
                shadowColor: 'transparent',
                backgroundColor: '#111',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Settings'
            component={Settings}
            options={{
              title: ' ',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#111',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DurationProvider>

  );
}

// -----------------------------------------------------------------------
//                                 Styles
// -----------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
  },
  main: {
    backgroundColor: '#111',
  },
});

// TODO: Theme use device settings
