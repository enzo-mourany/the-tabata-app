import { extendTheme } from 'native-base';

const config = {
    useSystemColorMode: false,
    initialColorMode: 'light'
}

const colors = {
    primary: {
        50: '#EEF2F6',
        100: '#F76A6A',
        200: '#334866',
        300: '#5ABEE6',
        400: '#020311'
    }
}

export default extendTheme({ config, colors });
