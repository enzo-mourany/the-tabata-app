// =======================================================================
// =======================================================================
// =========================                   ===========================
// ========================   The Tabata App    ==========================
// ======================                        =========================
// =====================      By Enzo Mourany     ========================
// ======================                        =========================
// ========================       @NaysWer      ==========================
// =========================                   ===========================
// =======================================================================
// =======================================================================


import React from 'react';
import { StyleSheet }
  from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePageApp';
import TimerAndCountdowns from './Timers';
import { DurationProvider } from './DurationContext';


const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};


// =======================================================================
//                              Main Function  
// =======================================================================

export default function App() {
  return (
    <DurationProvider>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator
          initialRouteName="Home"
          style={styles.navigator}
          screenOptions={{
            gestureEnable: true,
            gestureDirection: "horizontal",

          }}
          headerMode="float"
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
          <Stack.Screen name="Timers" component={TimerAndCountdowns}
            options={{
              title: ' ',
              headerStyle: {
                shadowColor: 'transparent',
                backgroundColor: '#061A40',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DurationProvider>
  )
}

// =======================================================================
//                                 Styles  
// =======================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E2749'
  },
})
