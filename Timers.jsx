import React, { useState, useEffect, useRef, useContext, useMemo, Image } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Animated, Button }
  from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomePage } from './HomePageApp';
import { NavigationContainer } from '@react-navigation/native';
import { DurationContext } from './DurationContext';

import Svg, { Circle, Text as SvgText } from 'react-native-svg';
//import { useSharedValue } from 'react-circular-reanimated'


// ======================  ProgressBar Const  ===========================

const circle_length = 1000;
const rayon = circle_length / (2.5 * Math.PI);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ========================  General Const  =============================

const { width, height } = Dimensions.get('window');
const colors = {
  backGround: '#061A40',
  button: '#FAFAFF',
  times: '#FAFAFF'
}

// =====================  Const for main timer  ==========================

const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

let roundsCounter = 1;



// =======================================================================
//                       Function TimerAndCountdowns  
// =======================================================================

function TimerAndCountdowns() {

  const [remainingSecs, setRemainingSecs] = useState(0);
  const { mins, secs } = getRemaining(remainingSecs);
  const [isActive, setIsActive] = useState(false);
  const [isExercise, setIsExercise] = useState(true);
  const { durationExercises, durationRest } = React.useContext(DurationContext);
  const listTimer = [durationExercises, durationRest];
  const [remainingTimer, setRemainingTimer] = useState(listTimer[0]);

  //const progress = useSharedValue(0);


  const toggle = () => {
    setIsActive(!isActive);
  }


  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
    setIsExercise(true);
    setRemainingTimer(listTimer[0]);
    roundsCounter = 1;
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        // timer
        setRemainingSecs(remainingSecs + 1);

        // countDown
        setRemainingTimer(remainingTimer - 1)
        if (remainingTimer == 1 && isExercise) {
          setRemainingTimer(listTimer[1]);
          setIsExercise(!isExercise);
        } else if (!isExercise && remainingTimer == 1) {
          setRemainingTimer(listTimer[0]);
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
  //                                Display  
  // =======================================================================


  return (
    <View style={styles.container}>

      <StatusBar style="light-content" />

      <View style={styles.timers}>
        <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
      </View>

      <View style={styles.countDowns}>

        <Svg>
          <Circle
            cx={width / 2}
            cy={height / 5}
            r={rayon}
            stroke={'#303858'}
            strokeWidth={20}
          />
          <AnimatedCircle
            cx={width / 2}
            cy={height / 5}
            r={rayon}
            stroke={'red'}
            strokeWidth={10}
            strokeDasharray={circle_length}
            strokeDashoffset={circle_length * (remainingTimer / 10)}
          />
          <SvgText
            style={remainingTimer <= 3 ? styles.timeLessThreeSecs : styles.timerExOrRest}
          >
            {remainingTimer}
          </SvgText>
        </Svg>

        <Text style={remainingTimer <= 3 ? styles.timeLessThreeSecs : styles.timerExOrRest}>{remainingTimer}</Text>
        <Text style={styles.exOrRest}>{isExercise ? 'Exercise' : 'Rest'}</Text>
        <Text style={styles.counterRounds}>Round {roundsCounter}</Text>
      </View>


      <View
        style={styles.buttons}>

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
//                                Styles  
// =======================================================================


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061A40',

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
    backgroundColor: "#061A40",
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  startButton: {
    backgroundColor: "#fff",
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
