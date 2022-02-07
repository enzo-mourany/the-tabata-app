import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { multiply } from 'react-native-reanimated';

import HalfCircle from './HalfCircle';
import { PI, RADIUS } from "./Constants";

interface CircularProgressProps {
    progress: Animated.Node<number>;
    bg: string;
    fg: string;
}

export default ({ progress, bg, fg }: CircularProgressProps) => {

    const theta = multiply(progress, 2 * PI);
    const rotateTop = interpolate(theta, {
        inputRange: [0, PI],
        outputRange: [0, PI],
        extrapolate: Extrapolate.CLAMP
    })

    return (
    <>
        <View style={{ zIndex: 1 }}>
            <HalfCircle color={bg} />
            <Animated.View 
                style={{
                    ...StyleSheet.absoluteFillObject, 
                    transform: transformOrigin(0, RADIUS/2, { rotate: rotateTop })
                }}
            >
                <HalfCircle color={fg} />
            </Animated.View>
        </View>
        <View style={{ transform: [{ rotate: "180deg" }] }}>
            <HalfCircle color={bg} />
            <Animated.View style={{...StyleSheet.absoluteFillObject }}>
                <HalfCircle color={fg} />
            </Animated.View>
        </View>
            </>
    );
};