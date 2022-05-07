import React from 'react';
import {
    HStack,
    Switch,
    useColorMode
} from 'native-base';

export default function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack space={2} alignItems="center">
            <Switch isChecked={colorMode === 'light'} onToggle={toggleColorMode}></Switch>
        </HStack>
    )
}
