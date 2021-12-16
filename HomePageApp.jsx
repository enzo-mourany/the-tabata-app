import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

function HomePage({ navigation }) {
    return (
        <View style={styles.homePageMainContent}>
            <Text>HomePage</Text>
            <Button title="Go to timers"
            onPress={() => navigation.navigate('Timers')} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    homePageMainContent: {
        flex: 1,
        backgroundColor: "#1E2749"
    }
})

export default HomePage;