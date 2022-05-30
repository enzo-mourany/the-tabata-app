import { Svg, Path, Circle } from 'react-native-svg';

export default function PauseButton() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 200 200">
      <Circle cx="100" cy="100" r="100" fill="#F72585" />
      <Path fill="#fff" d="M82 68h10v64H82zm26 0h10v64h-10z" />
    </Svg>
  )
}

