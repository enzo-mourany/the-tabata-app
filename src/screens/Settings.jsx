import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import ThemeToggle from '../components/theme-toggle';
import { Svg, Path } from 'react-native-svg';

export default function Settings({ navigation }) {
    return (

        <View
            flex={1}
            style={{ justifyContent: 'center', flex: 1, alignItems: 'center', backgroundColor: "#020311" }}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate('Countdown')}
                style={{ marginRight: 340 }}
            >
                <Svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" fill="none" viewBox="0 0 14 24">
                    <Path fill="#fff" d="M.94 10.94a1.5 1.5 0 0 0 0 2.12l9.545 9.547a1.5 1.5 0 1 0 2.122-2.122L4.12 12l8.486-8.485a1.5 1.5 0 1 0-2.122-2.122L.94 10.94ZM3 10.5H2v3h1v-3Z" />
                </Svg>
            </TouchableOpacity>


            <View style={{ width: "100%", height: "80%", alignItems: 'center' }}>

                <View alt="title" style={{ width: "80%", alignItems: 'center' }}>
                    <Text style={{ padding: 20, color: "white", fontSize: 20, fontWeight: "bold" }}>Settings</Text>
                </View>


                <View alt="title" style={{ flexDirection: "column", width: "100%", marginTop: 30 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ padding: 20, color: "white", fontSize: 15, fontWeight: "bold" }}>Dark mode</Text>
                        <View style={{ paddingRight: 20, paddingTop: 16 }}>
                            <ThemeToggle />
                        </View>
                    </View>

                    <View style={{ width: "100%", height: 0.6, backgroundColor: "#fff", opacity: 0.3, marginBottom: 6, marginTop: 5 }} />
                </View>
            </View>
            <Text style={{ color: "white", opacity: 0.4, fontSize: 14 }}>App made by Enzo Mourany</Text>
        </View>
    )
}