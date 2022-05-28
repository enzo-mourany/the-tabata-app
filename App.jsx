import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import Countdowns from './src/screens/Countdown';
import Settings from './src/screens/Settings';
import { DurationProvider } from './src/context/DurationContext';
import AppContainer from './src/components/app-container';

const Stack = createStackNavigator();


// =======================================================================
//                              Main Function  
// =======================================================================

export default function App() {
  return (
    <AppContainer>
      <DurationProvider style={styles.main}>
        <NavigationContainer style={styles.container} independent={true}>
          <Stack.Navigator
            initialRouteName="Home"
            style={styles.navigator}
            screenOptions={{
              gestureEnable: true,
              gestureDirection: "horizontal",
              headerMode: "float"
            }}
            animation="fade"
          >
            <Stack.Screen name="Home" component={HomePage}
              options={{
                title: ' ',
                headerShown: false,
                headerStyle: {
                  backgroundColor: '#04112A',
                },
              }}
            />
            <Stack.Screen name="Countdown" component={Countdowns}
              options={{
                title: ' ',
                headerStyle: {
                  shadowColor: 'transparent',
                  backgroundColor: '#311969',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen name="Settings" component={Settings}
              options={{
                title: ' ',
                headerShown: false,
                headerStyle: {
                  backgroundColor: '#04112A',
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DurationProvider>
    </AppContainer>

  )
}

// -----------------------------------------------------------------------
//                                 Styles  
// -----------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020311'
  },
  main: {
    backgroundColor: '#020311'
  },
})



// TODO: Animated switch between pages (stack navigator)
// TODO: Add sound button to 3 last seconds
// TODO: After 60s, set time with min and sec
// TODO: Animation rotate reset button
// TODO: Theme use device settings