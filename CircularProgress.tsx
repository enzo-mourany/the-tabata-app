import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import HalfCircle from './HalfCircle';

interface CircularProgressProps {
    progress: Animated.Node<number>;
    bg: string;
    fg: string;
}

export default ({ progress, bg, fg }: CircularProgressProps) => {
    return (
    <>
        <View style={{ zIndex: 1 }}>
            <HalfCircle color={bg} />
            <Animated.View style={{...StyleSheet.absoluteFillObject }}>
                <HalfCircle color={fg} />
            </Animated.View>
        </View>
        <View>
            <HalfCircle color={bg} />
            <Animated.View style={{...StyleSheet.absoluteFillObject }}>
                <HalfCircle color={fg} />
            </Animated.View>
        </View>
            </>
    );
};