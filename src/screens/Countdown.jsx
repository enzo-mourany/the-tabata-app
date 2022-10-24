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
import SettingsButton from '../components/SettingsButton';
import ResetButton from '../components/ResetButton';



// -----------------------------------------------------------------------
//                            General Const
// -----------------------------------------------------------------------

const { width, height } = Dimensions.get('window');
const colors = {
  backGround: '#111',
  progressBar: ['#F76A6A', '#80D39B'],
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

  const [duration, setDuration] = useState(listTimer[0]);


  const [progressBarColor, setProgressBarColor] = useState(colors.progressBar[0]);

  // Get height of progress bar View
  const [progressBarHeight, setProgressBarHeight] = useState(height);

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

  const animationPause = React.useCallback(() => {
    Animated.sequence([
      Animated.timing(progressAnimation, {
        toValue: progressBarHeight,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  }, [duration])

  // get the current height of the animated viewBox
  /*
  progressAnimation.addListener(({ value }) => {
    setProgressBarHeight(value);
  });
*/

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

          <View style={{ marginLeft: 50, marginRight: 50 }} alt='play / pause button'>
            <TouchableOpacity
              style={styles.playButton}
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
  countDowns: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingTimer: {
    fontSize: 100,
    color: 'white',
    textAlign: 'center',
    position: 'relative'
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
  exOrRest: {
    color: 'white',
    fontSize: 17,
    letterSpacing: 1,
  },
  playButton: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
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
