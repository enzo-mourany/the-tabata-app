import { View, Text } from 'react-native'
import React from 'react'

export default function Settings() {
    return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <View style={{ backgroundColor: "red", width: "80%", height: "80%", alignItems: 'center' }}>
                <View alt="title" style={{ backgroundColor: "grey", width: "80%", alignItems: 'center' }}>
                    <Text style={{ padding: 20 }}>Settings</Text>
                </View>
                <View alt="title" style={{ backgroundColor: "grey", width: "80%", alignItems: 'center', marginTop: 30, borderRadius: 14 }}>
                    <Text style={{ padding: 20 }}>Mode</Text>
                </View>
                <View alt="title" style={{ backgroundColor: "grey", width: "80%", alignItems: 'center', marginTop: 30, borderRadius: 14 }}>
                    <Text style={{ padding: 20 }}>Sound</Text>
                </View>
                <View alt="title" style={{ backgroundColor: "green", width: "80%", alignItems: 'center', marginTop: 30, borderRadius: 14 }}>
                    <Text style={{ padding: 20 }}>Validate</Text>
                </View>
            </View>
        </View>
    )
}