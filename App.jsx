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
import { UserContext } from "./UserContext";




const Stack = createStackNavigator();


// =======================================================================
// ===========================  Main Function  ===========================
// =======================================================================

export default function App() {
  return (
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
  )
}

// =======================================================================
// =============================  Styles  ================================
// =======================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E2749'
  },
})

// TODO :  créer un timer basic
//         different choix pour le temps d'ex(sec), de repos(sec) et total(min et sec)
//         convertir le temps total en secondes
//         additionner temps d'ex et temps de repos (le mettre dans une variable)
//         calculer combien dee fois on peux rentrer cette variable dans le temps total
//         nouvelle varioable, stocker le nombre de fois variable précédente
//         re séparer en deux temps (repos et ex) et voir combien de fois ils seront dans le temps total
//         lancer un timer ex, puis à chaque fois qu'un timer se termine, un autre se lance (alterner ex et repos)
//         possibilité de mettre un temps de repos plus long entre certaines séries
//         lancer en parallele un timer simple qui ne s'arrete qu'a la fin du temps total
//         pubs
//
//
//         variable timers en useState
//         add glow effect on numbers and animated circular progressbar
