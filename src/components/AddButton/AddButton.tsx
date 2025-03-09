import { useSelector } from 'react-redux';
import styles from './addButton.module.scss';
import { Timezone } from 'types/types';
import { RootState } from 'store/store';
import { useActions } from 'hooks/useActions';

const plusSrc = '/images/plus.svg';
const MAX_CLOCKS = 10;

export const AddButton: React.FC = () => {
	const { addClock } = useActions();
	const { timezones, clocks } = useSelector((state: RootState) => state.clocks);

	const addedCityIds = new Set(clocks.map(clock => clock.timezone.id));

	const nextCity: Timezone | undefined = timezones.find(
		tz => !addedCityIds.has(tz.id)
	);

	const handleAddClock = () => {
		if (nextCity) addClock(nextCity);
	};

	if (!nextCity || clocks.length >= MAX_CLOCKS) return null;

	return (
		<li className={styles.container}>
			<button className={styles.button} onClick={handleAddClock}>
				<img
					className={styles.btnImage}
					src={plusSrc}
					alt='Добавить временную зону'
				/>
			</button>
		</li>
	);
};
