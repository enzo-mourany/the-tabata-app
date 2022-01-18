import { createContext } from 'react';
import { timersExercises, timersRest } from './HomePageApp';


export const DurationContext = createContext();

export const DurationProvider = ({ children }) => {
    const [ durationExercises, setDurationExercises ] = useState(timersExercises[0]);
    return (
        <DurationContext.Provider value={{ durationExercises, setDurationExercises }}>
            {children}
        </DurationContext.Provider>
    )
}