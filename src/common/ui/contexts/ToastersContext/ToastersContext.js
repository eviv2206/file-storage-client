import { createContext } from 'react';

const initialToasterContext = {
    showToasterError: () => {},
    showToasterNotification: () => {},
    showToasterSuccess: () => {},
};

export const ToastersContext = createContext(initialToasterContext);