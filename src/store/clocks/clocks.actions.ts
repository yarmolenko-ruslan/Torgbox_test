import { createAsyncThunk } from '@reduxjs/toolkit';
import { Timezone } from 'types/types';

const API_URL = '/data/timezones.json';

export const fetchTimezones = createAsyncThunk<
	Timezone[],
	void,
	{ rejectValue: string }
>('clocks/fetchTimezones', async (_, thunkAPI) => {
	try {
		const response = await fetch(API_URL);
		return (await response.json()) as Timezone[];
	} catch (error) {
		return thunkAPI.rejectWithValue('Ошибка загрузки часовых поясов');
	}
});
