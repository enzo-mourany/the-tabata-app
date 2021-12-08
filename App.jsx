import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');
const colors = {
  backGround: '#1E2749',
  button: '#FAFAFF',
  times: '#FAFAFF'
}

const timersExercises = [20, 30, 40, 45, 50, 60, 75, 100];
const timerRest = [5, 10, 15, 20, 25, 30, 35, 40, 45];

const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}



// -------------------- Main Function -----------------------

export default function App() {
  const [remainingSecs, setRemaningSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);

  const toggle = () => {
    setIsActive(!isActive);
  }

  const reset = () => {
    setRemaningSecs(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemaningSecs(remainingSecs => remainingSecs + 1);
      }, 1000)
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSecs])



  return (
    <View style={styles.container}>
      <StatusBar style="light-content" />
      <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      <TouchableOpacity onPress={toggle} style={styles.startButton}>
        <Text style={styles.startButtonText}>{isActive ? 'PAUSE' : 'START'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>RESET</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2749',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  timerText: {
    color: '#FAFAFF',
    fontSize: 45,
    marginBottom: 20
  },
  startButton: {
    borderColor: '#E4D9FF',
    borderWidth: 7,
    width: width / 3,
    height: width / 3,
    borderRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  startButtonText: {
    fontSize: 28,
    color: '#E4D9FF'
  },
  resetButton: {
    borderColor: '#E4D9FF',
    borderWidth: 7,
    width: width / 3,
    height: width / 3,
    borderRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  resetButtonText: {
    fontSize: 28,
    color: '#E4D9FF'
  }
});

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
