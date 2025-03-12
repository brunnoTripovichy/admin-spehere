import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/languageSlice';
export const makeStore = () => {
    return configureStore({
        reducer: {
            language: languageReducer,
        },
    });
};
