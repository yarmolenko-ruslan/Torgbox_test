import { configureStore } from '@reduxjs/toolkit';
import { reducer as clocksReducer } from './clocks/clocks.slice';

export const store = configureStore({
	reducer: {
		clocks: clocksReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
