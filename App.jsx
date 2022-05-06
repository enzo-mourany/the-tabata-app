import React from 'react';
import { StyleSheet }
  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomePage from './src/screens/HomePageApp';
import Countdowns from './src/screens/Countdown';
import Settings from './src/screens/Settings';
import { DurationProvider } from './src/DurationContext';


const Stack = createStackNavigator();


// =======================================================================
//                              Main Function  
// =======================================================================

export default function App() {
  return (
    <DurationProvider style={styles.main}>
      <NavigationContainer style={styles.container}>
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
                backgroundColor: '#020311',
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
// TODO: Smooth circularProgressBar
// TODO: Add sound button to 3 last seconds
// TODO: After 60s, set time with min and sec
// TODO: Animation rotate reset button
// TODO: White theme