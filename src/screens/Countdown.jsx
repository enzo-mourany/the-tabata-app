import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing
} from 'react-native';
import { DurationContext } from '../context/DurationContext';
import PlayButton from '../components/PlayButton';
import PauseButton from '../components/PauseButton';
import SettingsButton from '../components/SettingsButton';
import ResetButton from '../components/ResetButton';
import { Circle } from 'react-native-svg';



// -----------------------------------------------------------------------
//                            General Const
// -----------------------------------------------------------------------

const { width, height } = Dimensions.get('window');
const colors = {
  backGround: '#111',
  second: '#111',
  button: '#FAFAFF',
  times: '#FAFAFF',
  progressBar: ['#F76A6A', '#80D39B'],
};

// -----------------------------------------------------------------------
//                           Main Timer Const
// -----------------------------------------------------------------------

const formatNumber = (number) => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};
let roundsCounter = 1;

// =======================================================================
//                       Function TimerAndCountdowns
// =======================================================================

function Countdowns({ navigation }) {
  const [isActive, setIsActive] = useState(false);
  const [isExercise, setIsExercise] = useState(true);
  const { durationExercises, durationRest } =
    useContext(DurationContext);
  const listTimer = [durationExercises, durationRest];
  const [remainingTimer, setRemainingTimer] = useState(listTimer[0]);

  const [progressBarColor, setProgressBarColor] = useState(colors.progressBar[0]);

  const [duration, setDuration] = useState(listTimer[0]);

  const reset = () => {
    setIsActive(false);
    setIsExercise(true);
    setRemainingTimer(listTimer[0]);
    setDuration(listTimer[0]);
    roundsCounter = 1;
    animationReset();
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingTimer(remainingTimer - 1);

        if (remainingTimer == 1 && isExercise) {
          setRemainingTimer(listTimer[1]);
          setProgressBarColor(colors.progressBar[1]);
          animationRest();
        } else if (remainingTimer == 1 && !isExercise) {
          roundsCounter += 1;
          setRemainingTimer(listTimer[0]);
          setProgressBarColor(colors.progressBar[0]);
          animationExercise();
        }

      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }

    if (remainingTimer == 0) {
      setIsExercise(!isExercise);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingTimer]);


  // Animation according to duration
  const progressAnimation = React.useRef(new Animated.Value(height)).current;
  const animationExercise = React.useCallback(() => {
    Animated.sequence([
      Animated.timing(progressAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear
      }),
      Animated.timing(progressAnimation, {
        toValue: height,
        duration: listTimer[0] * 1000,
        useNativeDriver: true
      })
    ]).start();
  }, [duration])

  const animationRest = React.useCallback(() => {
    Animated.sequence([
      Animated.timing(progressAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(progressAnimation, {
        toValue: height,
        duration: listTimer[1] * 1000,
        useNativeDriver: true
      })
    ]).start();
  }, [duration])

  const animationReset = React.useCallback(() => {
    Animated.sequence([
      Animated.timing(progressAnimation, {
        toValue: height,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  }, [duration])


  const toggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      animationExercise();
    }
  };

  return (
    <View style={styles.container}>

      <Animated.View
        style={[
          StyleSheet.absoluteFillObject, {
            height,
            width,
            backgroundColor: progressBarColor,
            transform: [{ translateY: progressAnimation }],
          }
        ]}
      />

      <View style={[
        StyleSheet.absoluteFillObject, {
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
        }
      ]}>
        <View style={styles.countDowns}>
          <Text style={styles.remainingTimer} >{remainingTimer}</Text>
        </View>

        <View style={styles.buttons}>
          <View style={styles.info}>
            <View style={styles.roundCounter}>
              <Text style={styles.exOrRest}>
                Round {roundsCounter}
              </Text>
            </View>


            <View style={styles.typeOfTimer} >
              <Text style={styles.exOrRest}>
                {isExercise ? 'Exercise' : 'Rest'}
              </Text>
            </View>
          </View>
        </View>

        <View
          alt='button'
          style={styles.buttons}
        >
          <View alt='settings button' style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <SettingsButton />
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 50, marginRight: 50 }} >
            <TouchableOpacity
              style={{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width * 0.2,
                height: Dimensions.get('window').width * 0.2,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              underlayColor='#ccc'
              onPress={toggle}
            >
            </TouchableOpacity>
          </View>

          <View alt='reset button'>
            <TouchableOpacity
              onPress={reset}
              style={styles.resetButton}
            >
              <ResetButton />
            </TouchableOpacity>
          </View>
        </View>


      </View>



    </View>
  );
}

// -----------------------------------------------------------------------
//                                Styles
// -----------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    flex: 1,
  },
  progressBar: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ========================  timer div  ================================
  timers: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: '#FAFAFF',
    fontSize: 75,
    marginBottom: 20,
  },
  remainingTimer: {
    fontSize: 100,
    color: 'white',
    textAlign: 'center',
    position: 'relative'
  },
  // ========================  circularProgressBar  ======================
  ct2: {
    color: '#fff',
    fontSize: 70,
  },
  // ========================  countdown div  ============================
  countDowns: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerExOrRest: {
    color: '#fff',
    fontSize: 70,
  },
  timeLessThreeSecs: {
    fontSize: 70,
    color: 'red',
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
    color: 'white',
    fontSize: 17,
    letterSpacing: 1,
  },

  // ==========================  Buttons Div  ==============================
  infos: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1.4,
  },
  info: {
    backgroundColor: 'transparent',
    width: '70%',
    height: '60%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  roundCounter: {
    width: '90%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 10,
  },
  menu: {
    margin: 1,
    alignItems: 'center',
  },
  counterRoundsText: {
    color: '#fff',
    fontSize: 12,
    letterSpacing: 1,
    marginLeft: 20,
  },
  counterRounds: {
    color: '#fff',
    fontSize: 22,
    letterSpacing: 1,
    marginLeft: 20,
    marginBottom: 100,

  },
  linearGStartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 190,
    height: 60,
    margin: 20,
  },
  linearGStartButtonInactive: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 185,
    height: 55,
    margin: 20,
  },
  startButtonText: {
    fontSize: 20,
    color: '#020311',
    letterSpacing: 1,
  },
  pauseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width / 4,
    letterSpacing: 1,
  },
  pauseButtonText: {
    fontSize: 28,
    color: '#FAFAFF',
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  typeOfTimer: {
    width: '90%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,


  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Countdowns;
