import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clock } from '../Clock/Clock';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import { AppDispatch, RootState } from 'store/store';
import { fetchTimezones } from 'store/clocks/clocks.actions';
import { AddButton } from 'components/AddButton/AddButton';
import styles from './app.module.scss';
import { FadeLoader } from 'react-spinners';

export const App: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { clocks, isLoading, error } = useSelector(
		(state: RootState) => state.clocks
	);

	useEffect(() => {
		dispatch(fetchTimezones());
	}, [dispatch]);

	return (
		<div className={styles.wrapper}>
			<Header />
			{isLoading ? (
				<div className={styles.loader}>
					<FadeLoader />
				</div>
			) : error ? (
				<p>Ошибка загрузки: {error}</p>
			) : (
				<main className={styles.main}>
					<ul className={styles.clockList}>
						{clocks.map(clock => (
							<Clock key={clock.id} clock={clock} />
						))}
						<AddButton />
					</ul>
				</main>
			)}
			<Footer />
		</div>
	);
};
