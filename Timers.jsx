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
  Animated
} from 'react-native';
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
//import LinearGradient from 'react-native-linear-gradient';
//import TrackPlayer from 'react-native-track-player';




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


    return (
      <View style={styles.container}>

        <StatusBar style="light-content" />

        <View style={styles.timers}>
          <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
        </View>

        <View style={styles.countDowns}>
          <CircularProgress
            value={remainingTimer}
            maxValue={isExercise ? listTimer[0] : listTimer[1]}
            radius={width / 2.5}
            title={remainingTimer}
            titleColor={remainingTimer <= 3 ? '#EF8DFF' : '#fff'}
            showProgressValue={false}
            fontSize={70}
            activeStrokeColor={isExercise ? '#16DB65' : '#f9b4ed'}
            activeStrokeSecondaryColor={isExercise ? '#03F7EB' : '#ff87ab'}
            inActiveStrokeColor={isExercise ? '#00D1FF' : '#C589E8'}
            inActiveStrokeSecondaryColor={isExercise ? '#EF8DFF' : '#80ffdb'}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={5}
          />
        </View>

        <View style={styles.infos}>


          <LinearGradient
            colors={['#B9F9F4', '#C6AFFA']}
            style={styles.exOrRestView}>
            <Text style={styles.exOrRest}>{isExercise ? 'Exercise' : 'Rest'}</Text>
          </LinearGradient>
          <LinearGradient
            colors={['#B9F9F4', '#C6AFFA']}
            style={styles.counterRoundsView}>
            <Text style={styles.counterRounds}>Round {roundsCounter}</Text>
          </LinearGradient>


        </View>

        <View style={styles.buttons}>

          <TouchableOpacity onPress={toggle} style={isActive ? styles.pauseButton : styles.startButton}>
            <Image
              style={{ width: width / 5, height: width / 5 }}
              source={isActive ? require('./IMG/pausebutton.png') : require('./IMG/playbutton.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={reset} style={styles.resetButton}>
            <Image
              style={{ width: width / 5, height: width / 5 }}
              source={require('./IMG/resetbutton.png')}
            />
          </TouchableOpacity>
        </View>

      </View>
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
    flex: 2,
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
  infos: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  exOrRestView: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 120,
    height: 40,
    margin: 20
  },
  counterRoundsView: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 120,
    height: 40,
    margin: 20
  },
  exOrRest: {
    color: "#fff",
    fontSize: 17,
    fontFamily: 'Poppins_400Regular',
    letterSpacing: 1
  },
  counterRounds: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Poppins_400Regular',
    letterSpacing: 1
  },
  // ==========================  Buttons Div  ==============================
  buttons: {
    flex: 1.5,
    backgroundColor: colors.backGround,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  startButton: {
    width: width / 4,
    height: width / 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width / 4
  },
  startButtonText: {
    fontSize: 28,
    color: '#fff',
  },
  pauseButton: {
    width: width / 4,
    height: width / 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width / 4
  },
  pauseButtonText: {
    fontSize: 28,
    color: '#FAFAFF'
  },
  resetButton: {
    width: width / 4,
    height: width / 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width / 4
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