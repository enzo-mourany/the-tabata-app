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


// =======================================================================
//                              Main Function  
// =======================================================================

export default function App() {
  return (
    <DurationProvider>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="Home" style={styles.navigator}>
          <Stack.Screen name="Home" component={HomePage}
            options={{
              title: '',
              headerShown: false,
              headerStyle: {
                backgroundColor: '#04112A',
              },
            }}
          />
          <Stack.Screen name="Timers" component={TimerAndCountdowns}
            options={{
              title: '',
              headerStyle: {
                shadowColor: 'transparent',
                backgroundColor: '#04112A',
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
