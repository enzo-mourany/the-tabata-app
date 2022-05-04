import React, {
  useState,
  useEffect,
} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  Easing,
} from 'react-native';
import data from './data';
import { StatusBar } from 'expo-status-bar';
import { DurationContext } from './DurationContext';
import CircularProgress from 'react-native-circular-progress-indicator';
import AppLoading from 'expo-app-loading';
import { Svg, Path, Circle } from 'react-native-svg';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { LinearGradient } from "expo-linear-gradient";
//import TrackPlayer from 'react-native-track-player';
import AppIntroSlider from 'react-native-app-intro-slider';
import { motion } from "framer-motion";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


// -----------------------------------------------------------------------
//                            General Const  
// -----------------------------------------------------------------------


const { width, height } = Dimensions.get('window');
const colors = {
  backGround: '#020311',
  button: '#FAFAFF',
  times: '#FAFAFF'
}


// -----------------------------------------------------------------------
//                           Main Timer Const  
// -----------------------------------------------------------------------


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


function Countdowns() {

  const [remainingSecs, setRemainingSecs] = useState(0);
  const { mins, secs } = getRemaining(remainingSecs);
  const [isActive, setIsActive] = useState(false);
  const [isExercise, setIsExercise] = useState(true);
  const { durationExercises, durationRest } = React.useContext(DurationContext);
  const listTimer = [durationExercises, durationRest];
  const [remainingTimer, setRemainingTimer] = useState(listTimer[0]);



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


  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {


    return (
      <View style={styles.container}>

        <StatusBar style="light-content" />

        <View style={styles.timers}>
          <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>


        </View>

        <View style={styles.countDowns}>

          <CountdownCircleTimer
            isPlaying={isActive ? true : false}
            duration={isExercise ? durationExercises : durationRest}
            trailStrokeWidth={5}
            size={300}
            colors={['#5ABEE6']}
            onComplete={() => {
              return { shouldRepeat: true }
            }}
          >
            <Text style={styles.timerExOrRest}>{remainingTimer}</Text>
            <View style={{ backgroundColor: "red" }}></View>
          </CountdownCircleTimer>
        </View>

        <View alt="start / pause button" style={styles.menu}>
          <TouchableOpacity onPress={toggle}>
            <LinearGradient
              colors={['#5ABEE6', '#BBF1F4']}
              start={[0, 1]} end={[0, 0]}
              //start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
              style={styles.linearGStartButton}
            >
              <LinearGradient
                colors={toggle ? ['transparent', 'transparent'] : ['colors.backGround', 'colors.backGround']}
                start={[0, 0]} end={[1, 0]}
                style={styles.linearGStartButtonInactive}
              >
                <Text style={styles.startButtonText}>{isActive ? 'PAUSE' : 'START'}</Text>
              </LinearGradient>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View alt="reset button">
          <TouchableOpacity
            onPress={reset}
            style={styles.resetButton}>
            <Animated.Image
              style={{ width: 30, height: 30 }}
              source={require('../IMG/reset.png')}
            />
          </TouchableOpacity>
        </View>



        <View style={styles.buttons}>
          <View style={styles.info}>


            <View alt="round counter"
              style={{ width: "90%", height: "40%", justifyContent: "center", alignItems: "center" }}
            >
              <Text style={styles.exOrRest}>Round {roundsCounter}</Text>
            </View>

            <View
              style={{ width: "90%", height: 1, backgroundColor: "white", opacity: 0.4 }}
            />



            <View alt="exercise or rest" style={{ width: "90%", height: "40%", justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.exOrRest}>{isExercise ? 'Exercise' : 'Rest'}</Text>
            </View>



          </View>

        </View>
      </View >
    );
  }
}


// -----------------------------------------------------------------------
//                                Styles  
// -----------------------------------------------------------------------


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGround,

  },
  // ========================  timer div  ================================
  timers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerText: {
    color: '#FAFAFF',
    fontSize: 75,
    marginBottom: 20,
  },
  // ========================  circularProgressBar  ======================
  ct2: {
    color: "#fff",
    fontSize: 70
  },
  // ========================  countdown div  ============================
  countDowns: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerExOrRest: {
    color: "#fff",
    fontSize: 70
  },
  timeLessThreeSecs: {
    fontSize: 70,
    color: 'red'
  },
  // ==========================  Infos  ==============================
  exOrRestView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 130,
    height: 40,
  },

  exOrRest: {
    color: "#fff",
    fontSize: 17,
    fontFamily: 'Poppins_400Regular',
    letterSpacing: 1
  },

  // ==========================  Buttons Div  ==============================
  buttons: {
    flex: 1.5,
    //backgroundColor: colors.backGround,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  info: {
    backgroundColor: 'blue',
    width: '90%',
    height: '80%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  menu: {
    margin: 1,
    alignItems: 'center',
  },
  counterRoundsText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 1,
    marginLeft: 20
  },
  counterRounds: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: 1,
    marginLeft: 20,
    marginBottom: 100
  },
  linearGStartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 190,
    height: 60,
    margin: 20
  },
  linearGStartButtonInactive: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 185,
    height: 55,
    margin: 20
  },
  startButtonText: {
    fontSize: 20,
    color: '#020311',
    fontFamily: 'Poppins_400Regular',
    letterSpacing: 1
  },
  pauseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width / 4,
    letterSpacing: 1
  },
  pauseButtonText: {
    fontSize: 28,
    color: '#FAFAFF'
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default Countdowns;