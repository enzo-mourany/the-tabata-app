import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import ThemeToggle from '../components/theme-toggle';

export default function Settings({ navigation }) {
    return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: "#020311" }}>
            <View style={{ width: "80%", height: "80%", alignItems: 'center' }}>
                <View alt="title" style={{ width: "80%", alignItems: 'center' }}>
                    <Text style={{ padding: 20, color: "white", fontSize: 20, fontWeight: "bold" }}>Settings</Text>
                </View>
                <View alt="title" style={{ backgroundColor: "grey", width: "80%", alignItems: 'center', marginTop: 30, borderRadius: 14 }}>
                    <Text style={{ padding: 20, color: "white", fontSize: 20, }}>Mode</Text>
                    <ThemeToggle />
                </View>
                <View alt="title" style={{ backgroundColor: "grey", width: "80%", alignItems: 'center', marginTop: 30, borderRadius: 14 }}>
                    <Text style={{ padding: 20, color: "white", fontSize: 20, }}>Sound</Text>
                </View>
                <TouchableOpacity
                    alt="title"
                    style={{ backgroundColor: "green", width: "80%", alignItems: 'center', marginTop: 30, borderRadius: 14 }}
                    onPress={() => navigation.navigate('Countdown')}
                >
                    <Text style={{ padding: 20, color: "white", fontSize: 20, }}>Validate</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}