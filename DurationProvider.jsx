import React, { useState } from 'react';
import { timersExercises, timersRest } from './HomePageApp';

const DurationContext = React.createContext();

const DurationProvider = (props) => {
    const [durationExercises, setDurationExercises] = useState(timersExercises[0]);
    const [durationRest, setDurationRest] = useState(timersRest[0]);

    return (
        <DurationContext.Provider
        value={{
            durationExercises,
            durationRest,
            setDurationExercises,
            setDurationRest
        }}>
            {props.children}
        </DurationContext.Provider>
    )
}

export { DurationProvider, DurationContext };