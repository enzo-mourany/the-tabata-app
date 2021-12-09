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
  const mills = time - secs * 60;//Math.floor(((time % 360000) % 6000) % 100);
  return { mins: formatNumber(mins), secs: formatNumber(secs), mills: formatNumber(mills) };
}



// -------------------- Main Function -----------------------

export default function App() {
  const [remainingMills, setRemainingMills] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs, mills } = getRemaining(remainingMills);

  const toggle = () => {
    setIsActive(!isActive);
  }

  const reset = () => {
    setRemainingMills(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingMills(remainingMills => remainingMills + 1);
      }, 10)
    } else if (!isActive && remainingMills !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [isActive, remainingMills])



  return (
    <View style={styles.container}>

      <StatusBar style="light-content" />
      <View style={styles.timers}>
        <Text style={styles.timerText}>{`${mins}:${secs},${mills}`}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={toggle} style={isActive ? styles.pauseButton : styles.startButton}>
          <Text style={isActive ? styles.pauseButtonText : styles.startButtonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2749',

  },
  timers: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons: {
    flex: 3,
    backgroundColor: "#1E2749",
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  timerText: {
    color: '#FAFAFF',
    fontSize: 75,
    marginBottom: 20
  },
  startButton: {
    backgroundColor: "#5C6698",
    borderColor: '#9DA3EA',
    borderWidth: 3,
    width: width / 3,
    height: width / 3,
    borderRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  startButtonText: {
    fontSize: 28,
    color: '#FAFAFF'
  },
  pauseButton: {
    borderColor: '#65AFFF',
    borderWidth: 3,
    width: width / 3,
    height: width / 3,
    borderRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  pauseButtonText: {
    fontSize: 28,
    color: '#FAFAFF'
  },
  resetButton: {
    backgroundColor: "#5C6698",
    borderColor: '#9DA3EA',
    borderWidth: 3,
    width: width / 3,
    height: width / 3,
    borderRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  resetButtonText: {
    fontSize: 28,
    color: '#FAFAFF'
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
