import { useContext } from 'react';
import { ToastersContext } from '../ToastersContext';

export const useToasters = () => useContext(ToastersContext);