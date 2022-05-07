import React, { createContext, useState } from 'react';

export const DurationContext = createContext();

export const DurationProvider = ({ children }) => {
    const [durationExercises, setDurationExercises] = useState(5);
    const [durationRest, setDurationRest] = useState(5);

    return (
        <DurationContext.Provider value={{ durationExercises, setDurationExercises, durationRest, setDurationRest }}>
            {children}
        </DurationContext.Provider>
    )
}
