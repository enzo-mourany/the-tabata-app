import * as React from 'react';
import {
  StatusBar,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { DurationContext } from '../context/DurationContext';


// -----------------------------------------------------------------------
//                                Const   
// -----------------------------------------------------------------------

const { width, height } = Dimensions.get('window');
const colors = {
  black: '#111',
  red: '#F76A6A',
  text: '#ffffff',
};


let timersExercises = [...Array(20).keys()].map((i) => (i === 0 ? 1 : i * 5));
timersExercises.splice(0, 1);
let timersRest = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
timersRest.splice(0, 1);

const item_size = width * 0.38;
const item_spacing = (width - item_size) / 2;


// =======================================================================
//                           Function HomePage  
// =======================================================================

function HomePage({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXRest = React.useRef(new Animated.Value(0)).current;
  const { setDurationExercises, setDurationRest } = React.useContext(DurationContext);


  return (
    <View style={styles.container}>

      <StatusBar hidden />

      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 60,
          },
        ]}>


        <TouchableOpacity
          onPress={() => navigation.navigate('Countdown')}>
          <Image
            style={styles.roundButton}
            source={require('../../IMG/start-timer-button.png')}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* =================  Timers Exercises  =================== */}

      <View
        style={{
          position: 'absolute',
          top: height / 6,
          left: 0,
          right: 0,
          flex: 1,
          alignItems: 'center',
        }}>

        <Text
          style={styles.textIndicator}
        >Exercise Duration</Text>

        <Animated.FlatList
          data={timersExercises}
          keyExtractor={item => item.toString()}
          horizontal
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}

          onMomentumScrollEnd={ev => {
            const indexExercise = Math.round(ev.nativeEvent.contentOffset.x / item_size);
            setDurationExercises(timersExercises[indexExercise]);
          }}

          showsHorizontalScrollIndicator={false}
          snapToInterval={item_size}
          decelerationRate="fast"
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            paddingHorizontal: item_spacing
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * item_size,
              index * item_size,
              (index + 1) * item_size,
            ]
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [.4, 1, .4]
            })
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [.6, 1, .6]
            })
            return <View style={{ width: item_size, justifyContent: 'center', alignItems: 'center' }}>
              <Animated.Text style={[styles.textExTimers,
              {
                opacity, transform: [{
                  scale
                }]
              }
              ]}>
                {item}
              </Animated.Text>
            </View>
          }}
        />
      </View>

      {/* ===================  Timers Rest  ==================== */}

      <View
        style={{
          position: 'absolute',
          top: height / 2.1,
          left: 0,
          right: 0,
          flex: 1,
          alignItems: 'center',
        }}>

        <Text
          style={styles.textIndicator}
        >Rest Duration</Text>

        <Animated.FlatList
          data={timersRest}
          keyExtractor={item => item.toString()}
          horizontal
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollXRest } } }],
            { useNativeDriver: true }
          )}

          onMomentumScrollEnd={ev => {
            const indexRest = Math.round(ev.nativeEvent.contentOffset.x / item_size);
            setDurationRest(timersRest[indexRest]);
          }}

          showsHorizontalScrollIndicator={false}
          snapToInterval={item_size}
          decelerationRate="fast"
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            paddingHorizontal: item_spacing
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * item_size,
              index * item_size,
              (index + 1) * item_size,
            ]
            const opacity = scrollXRest.interpolate({
              inputRange,
              outputRange: [.4, 1, .4]
            })
            const scale = scrollXRest.interpolate({
              inputRange,
              outputRange: [.6, 1, .6]
            })
            return <View style={{ width: item_size, justifyContent: 'center', alignItems: 'center' }}>
              <Animated.Text style={[styles.textExTimers,
              {
                opacity, transform: [{
                  scale
                }]
              }
              ]}>
                {item}
              </Animated.Text>
            </View>
          }}
        />
      </View>

    </View>
  );
}


// -----------------------------------------------------------------------
//                                Styles    
// -----------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    bottom: 2,
    width: 120,
    height: 120,
    borderRadius: 120,
  },
  text: {
    fontSize: item_size * 0.8,
    color: colors.text,
    fontWeight: '900',
  },
  textExTimers: {
    color: "#fff",
    fontSize: 100
  },
  textIndicator: {
    color: "#fff",
    fontSize: 20,
    paddingBottom: 20,
    letterSpacing: 1,
  }
});

export default HomePage;
