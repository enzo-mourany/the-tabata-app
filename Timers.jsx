import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  Image
} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomePage } from './HomePageApp';
import { NavigationContainer } from '@react-navigation/native';
import { DurationContext } from './DurationContext';
import CircularProgress from 'react-native-circular-progress-indicator';
import AppLoading from 'expo-app-loading';
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
import Sound from 'react-native-sound';



// -----------------------------------------------------------------------
//                            General Const  
// -----------------------------------------------------------------------


const { width, height } = Dimensions.get('window');
const colors = {
  backGround: '#061A40',
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


function TimerAndCountdowns() {

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

    // =======================================================================
    //                                Display  
    // =======================================================================


    return (
      <View style={styles.container}>

        <StatusBar style="light-content" />

        <View style={styles.timers}>
          <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
          <Text style={styles.exOrRest}>{isExercise ? 'Exercise' : 'Rest'}</Text>
          <Text style={styles.counterRounds}>Round {roundsCounter}</Text>
        </View>

        <View style={styles.countDowns}>
          <CircularProgress
            radius={width / 2.5}
            value={remainingTimer}
            maxValue={isExercise ? listTimer[0] : listTimer[1]}
            title={remainingTimer}
            titleColor={remainingTimer <= 3 ? '#EF8DFF' : '#fff'}
            showProgressValue={false}
            fontSize={70}
            activeStrokeColor={isExercise ? '#00D1FF' : '#C589E8'}
            activeStrokeSecondaryColor={isExercise ? '#EF8DFF' : '#80ffdb'}
            inActiveStrokeColor={isExercise ? '#00D1FF' : '#C589E8'}
            inActiveStrokeSecondaryColor={isExercise ? '#EF8DFF' : '#80ffdb'}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={6}
          />
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
    marginBottom: 20,
  },
  // ===========================  circularProgressBar ==============================
  ct2: {
    color: "#fff",
    fontSize: 70
  },
  // =========================  Countdown Div  =============================
  countDowns: {
    flex: 3.5,
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
  exOrRest: {
    color: "#fff",
    fontSize: 17,
    marginBottom: 7,
    fontFamily: 'Poppins_600SemiBold'
  },
  counterRounds: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold'
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
    borderColor: '#fff',
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
    color: '#fff',
  },
  pauseButton: {
    borderColor: '#fff',
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
    borderColor: '#fff',
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default TimerAndCountdowns;