import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../store/clocks/clocks.slice';
import { AppDispatch } from '../store/store';

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>();

	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
