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
} from 'react-native';
import { DurationContext } from '../context/DurationContext';
import PlayButton from '../components/PlayButton';
import PauseButton from '../components/PauseButton';
import SettingsButton from '../components/SettingsButton';
import ResetButton from '../components/ResetButton';



// -----------------------------------------------------------------------
//                            General Const
// -----------------------------------------------------------------------

const { width, height } = Dimensions.get('window');
const colors = {
  backGround: '#111',
  second: '#111',
  button: '#FAFAFF',
  times: '#FAFAFF',
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
  const [remainingSecs, setRemainingSecs] = useState(0);
  //const { mins, secs } = getRemaining(remainingSecs);
  const [isActive, setIsActive] = useState(false);
  const [isExercise, setIsExercise] = useState(true);
  const { durationExercises, durationRest } =
    useContext(DurationContext);
  const listTimer = [durationExercises, durationRest];
  const [remainingTimer, setRemainingTimer] = useState(listTimer[0]);
  const [key, setKey] = useState(0);
  // const setIsPlaying = useContext(PlayingContext);

  const [duration, setDuration] = useState(durationExercises);
  const [isDowntime, setIsDowntime] = useState(false);
  const changeDurationTimer = useCallback(() => {
    setDuration((prev) => !prev);
  }, []);

  const toggle = () => {
    setIsActive(!isActive);
    setKey(0);
  };

  const reset = () => {
    setRemainingSecs(0);
    setIsActive(false);
    setIsExercise(true);
    setRemainingTimer(listTimer[0]);
    setKey(durationExercises);
    setDuration(durationExercises);
    roundsCounter = 1;
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        // timer
        setRemainingSecs(remainingSecs + 1);

        if (isDowntime) {
          setDuration(durationRest);
        } else {
          setDuration(durationExercises);
        }

        setRemainingTimer(remainingTimer - 1);
        if (remainingTimer == 1 && isExercise) {
          setRemainingTimer(listTimer[1]);
          setIsExercise(!isExercise);
        } else if (!isExercise && remainingTimer == 1) {
          roundsCounter += 1;
          setRemainingTimer(listTimer[0]);
          setIsExercise(!isExercise);
        }
      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs, remainingTimer]);

  const progressAnimation = React.useRef(new Animated.Value(height)).current;


  return (
    <View style={styles.container}>



      <View style={styles.wrapper}>
        <View style={styles.countDowns}>
          <Text style={styles.remainingTimer} >{remainingTimer}</Text>
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
            <TouchableOpacity onPress={toggle}>
              {isActive ? <PauseButton /> : <PlayButton />}
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

        <View style={styles.buttons}>
          <View style={styles.info}>
            <View style={styles.roundCounter}>
              <Text style={styles.exOrRest}>
                Round {roundsCounter}
              </Text>
            </View>

            <View
              style={{
                width: '90%',
                height: 1,
                backgroundColor: colors.backGround,
                opacity: 0.4,
                marginBottom: 6,
                marginTop: 5,
              }}
            />

            <View style={styles.typeOfTimer} >
              <Text style={styles.exOrRest}>
                {isExercise ? 'Exercise' : 'Rest'}
              </Text>
            </View>
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
    backgroundColor: colors.backGround,
  },
  wrapper: {
    width: width,
    height: height,
    backgroundColor: colors.backGround,
    position: 'absolute',
  },
  progressBar: {
    //flex: 1,
    zIndex: 1,
    height: '50%',
    backgroundColor: 'red',
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
    opacity: 0.6,
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
    backgroundColor: 'red'
  },
  info: {
    backgroundColor: '#222',
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

  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Countdowns;
