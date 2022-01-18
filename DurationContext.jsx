import { createContext } from 'react';

export const DurationContext = createContext();

export const DurationProvider = ({children}) => {
    return (
        <DurationContext.Provider>
            {children}
        </DurationContext.Provider>
    )
}