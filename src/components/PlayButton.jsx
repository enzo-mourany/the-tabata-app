import React, { useContext } from 'react'
import { Svg, Path, Circle } from 'react-native-svg';
import PlayingContext from '../context/PlayingContext';

class Button {
    playButton() {
        return (
            <Svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 200 200" >
                <Circle cx="100" cy="100" r="100" fill="#F72585" />
                <Path fill="#fff" d="m138 100.5-56.25 32.476V68.024L138 100.5Z" />
            </Svg>
        )
    }
    pauseButton() {
        return (
            <Svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none" viewBox="0 0 200 200">
                <Circle cx="100" cy="100" r="100" fill="#F72585" />
                <Path fill="#fff" d="M82 68h10v64H82zm26 0h10v64h-10z" />
            </Svg>
        )
    }
}

export default function PlayButton() {

    //const isPlaying = useContext(PlayingContext);
    let button = new Button();

    return (
        button.playButton()
    )
}