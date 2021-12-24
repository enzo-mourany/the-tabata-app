import { duration } from 'moment';
import * as React from 'react';
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { listAllTimersExercises, listTimer } from './Timers';
import TimerAndCountdowns from './Timers';


// =======================================================================
// =============================  Consts  ================================
// =======================================================================

const { width, height } = Dimensions.get('window');
const colors = {
  black: '#04112A',
  red: '#F76A6A',
  text: '#ffffff',
};

const timersExercises = [...Array(20).keys()].map((i) => (i === 0 ? 1 : i * 5));
const timersRest = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;


// =======================================================================
// ========================  Function HomePage  ==========================
// =======================================================================

function HomePage({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXRest = React.useRef(new Animated.Value(0)).current;
  const [durationExercises, setDurationExercises] = React.useState(timersExercises[0]);
  const [durationRest, setDurationRest] = React.useState(timersRest[0]);


  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 100,
          },
        ]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Timers')}>
          <View
            style={styles.roundButton}
          />
        </TouchableOpacity>
      </Animated.View>


      {/* =================  Timers Exercises  =================== */}
      <View
        style={{
          position: 'absolute',
          top: height / 5,
          left: 0,
          right: 0,
          flex: 1,
        }}>
          <Animated.FlatList 
            data={timersExercises}
            keyExtractor={item => item.toString()}
            horizontal
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true}
            )}


            //TODO
            onMomentumScrollEnd={ev => {
              const indexExercise = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
              setDurationExercises(timersExercises[indexExercise]);
            }}



            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            decelerationRate="fast"
            style={{flexGrow: 0}}
            contentContainerStyle={{
              paddingHorizontal: ITEM_SPACING
            }}
            renderItem={({item, index}) => {
              const inputRange = [
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
                (index + 1) * ITEM_SIZE,
              ]
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [.4, 1, .4]
              })
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [.6, 1, .6]
              })
              return <View style={{width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center'}}>
                <Animated.Text style={[styles.textExTimers, 
                  {opacity, transform: [{
                    scale
                  }]}
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
          top: height / 2.2,
          left: 0,
          right: 0,
          flex: 1,
        }}>
          <Animated.FlatList 
            data={timersRest}
            keyExtractor={item => item.toString()}
            horizontal
            bounces={false}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollXRest}}}],
              {useNativeDriver: true}
            )}


            //TODO
            onMomentumScrollEnd={ev => {
              const indexRest = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
              setDurationRest(timersRest[indexRest]); 
            }}



            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            decelerationRate="fast"
            style={{flexGrow: 0}}
            contentContainerStyle={{
              paddingHorizontal: ITEM_SPACING
            }}
            renderItem={({item, index}) => {
              const inputRange = [
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
                (index + 1) * ITEM_SIZE,
              ]
              const opacity = scrollXRest.interpolate({
                inputRange,
                outputRange: [.4, 1, .4]
              })
              const scale = scrollXRest.interpolate({
                inputRange,
                outputRange: [.6, 1, .6]
              })
              return <View style={{width: ITEM_SIZE, justifyContent: 'center', alignItems: 'center'}}>
                <Animated.Text style={[styles.textExTimers, 
                  {opacity, transform: [{
                    scale
                  }]}
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

// =======================================================================
// =============================  Styles  ================================
// =======================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: 'Menlo',
    color: colors.text,
    fontWeight: '900',
  },
  textExTimers: {
    color: "#fff",
    fontSize: 100
  }
});

export default HomePage;