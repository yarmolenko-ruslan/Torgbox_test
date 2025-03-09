import { createSlice } from '@reduxjs/toolkit';
import { fetchTimezones } from './clocks.actions';
import { ClocksState } from 'types/types';

const initialState: ClocksState = {
	clocks: [],
	timezones: [],
	isLoading: true,
	error: null,
};

const clocksSlice = createSlice({
	name: 'clocks',
	initialState,
	reducers: {
		addClock: (state, { payload: timezone }) => {
			const existingClockIds = new Set(
				state.clocks.map(clock => clock.timezone.id)
			);

			if (!existingClockIds.has(timezone.id) && state.clocks.length < 10) {
				state.clocks.push({ id: Date.now(), timezone });
			}
		},
		removeClock: (state, { payload: clockId }) => {
			state.clocks = state.clocks.filter(clock => clock.id !== clockId);
		},
		updateClockTimezone: (state, { payload }) => {
			const { clockId, newTimezone } = payload;
			const existingClockIds = new Set(
				state.clocks.map(clock => clock.timezone.id)
			);

			const clock = state.clocks.find(clock => clock.id === clockId);
			if (
				clock &&
				!existingClockIds.has(newTimezone.id) &&
				clock.timezone.id !== newTimezone.id
			) {
				clock.timezone = newTimezone;
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTimezones.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchTimezones.fulfilled, (state, { payload: timezones }) => {
				state.timezones = timezones;
				state.isLoading = false;

				if (state.clocks.length === 0) {
					const firstCity = timezones[0];
					if (firstCity) {
						state.clocks.push({ id: Date.now(), timezone: firstCity });
					}
				}
			})
			.addCase(fetchTimezones.rejected, state => {
				state.isLoading = false;
				state.error = 'Ошибка загрузки часовых поясов';
			});
	},
});

export const { actions, reducer } = clocksSlice;
