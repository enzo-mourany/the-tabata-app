import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Animated, Button }
  from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomePage, { durationExercises, durationRest, timersExercises, timersRest, indexExercise } from './HomePageApp';
import { NavigationContainer } from '@react-navigation/native';
//import { LinearGradient } from "expo-linear-gradient";




// ========================  General Const  =============================

const { width, height } = Dimensions.get('window');
const colors = {
  backGround: '#1E2749',
  button: '#FAFAFF',
  times: '#FAFAFF'
}


// =====================  Const for main timer  ==========================

// Format number < 10 , add 0 in front of them
const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

// ===========  Const/Var for countdown exercises and rest  ==============

const listAllTimersExercises = [20, 30, 40, 45, 50, 60, 75, 100];
const listAllTimersRest = [5, 10, 15, 20, 25, 30, 35, 40, 45];

const listTimer = [listAllTimersExercises[1], listAllTimersRest[1]];
let roundsCounter = 1;



// =======================================================================
// ====================  Function TimerAndCountdowns  ====================
// =======================================================================

function TimerAndCountdowns({ navigation }) {

  //const listTimer = [navigation.durationExercises, navigation.durationRest];

  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);
  const [isExercise, setIsExercise] = useState(true);
  const [remainingTimer, setRemainingTimer] = useState(listTimer[0]);
  //const [remainingTimer, setRemainingTimer] = useState(navigation.durationExercises);


  const toggle = () => {    // If one of buttons is clicked
    setIsActive(!isActive);
  }

  const reset = () => {   // To reset const useState
    setRemainingSecs(0);
    setIsActive(false);
    setIsExercise(true);
    setRemainingTimer(listTimer[0]);
    //setRemaningTimer(navigation.durationExercises)
    roundsCounter = 1;
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs + 1);

        setRemainingTimer(remainingTimer - 1)
        if (remainingTimer == 1 && isExercise) {
          setRemainingTimer(listTimer[1]);
          //setRemainingTimer(navigation.durationRest);
          setIsExercise(!isExercise);
        } else if (!isExercise && remainingTimer == 1) {
          setRemainingTimer(listTimer[0]);
          //setRemaningTimer(navigation.durationExercises)
          setIsExercise(!isExercise);
          roundsCounter += 1;
        }

      }, 1000)
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs, remainingTimer])

  // =======================================================================
  // =============================  Display  ===============================
  // =======================================================================



  return (
    <View style={styles.container}>

      <StatusBar style="light-content" />

      <View style={styles.timers}>
        <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      </View>

      <View style={styles.countDowns}>
        <Text style={remainingTimer <= 3 ? styles.timeLessThreeSecs : styles.timerExOrRest}>{remainingTimer}</Text>
        <Text style={styles.exOrRest}>{isExercise ? 'Exercise' : 'Rest'}</Text>
        <Text style={styles.counterRounds}>Round {roundsCounter}</Text>
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

// =======================================================================
// =============================  Styles  ================================
// =======================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04112A',

  },
  // ===========================  Timer Div  ==============================
  timers: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerText: {
    color: '#FAFAFF',
    fontSize: 75,
    marginBottom: 20
  },
  // =========================  Countdown Div  =============================
  countDowns: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerExOrRest: {
    color: "#fff",
    fontSize: 70
  },
  timeLessThreeSecs: {
    fontSize: 70,
    color: 'red'
  },
  exOrRest: {
    color: "#fff",
    fontSize: 17,
    marginBottom: 7
  },
  counterRounds: {
    color: '#fff',
    fontSize: 17
  },
  // ==========================  Buttons Div  ==============================
  buttons: {
    flex: 2,
    backgroundColor: "#04112A",
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  startButton: {
    backgroundColor: "#5C6698",
    borderColor: '#9DA3EA',
    borderBottomColor: 'red',
    borderWidth: 3,
    width: width / 4,
    height: width / 4,
    borderRadius: width / 4,
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
    width: width / 4,
    height: width / 4,
    borderRadius: width / 4,
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
    width: width / 4,
    height: width / 4,
    borderRadius: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  },
  resetButtonText: {
    fontSize: 28,
    color: '#FAFAFF'
  }
});

export default TimerAndCountdowns;