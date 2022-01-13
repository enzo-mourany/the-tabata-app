import React, { useState } from 'react';
import { timersExercises, timersRest } from './HomePageApp';

const DurationContext = React.createContext();

const DurationProvider = () => {
    const [durationExericises, setDurationExercises] = useState(timersExercises[0]);
    const [durationRest, setDurationRest] = useState(timersRest[0]);

}