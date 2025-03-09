import { useActions } from '../../hooks/useActions';
import { ClockProps } from 'types/types';
import styles from './deleteButton.module.scss';

export const DeleteButton = ({ clock }: ClockProps) => {
	const { removeClock } = useActions();

	return (
		<button className={styles.button} onClick={() => removeClock(clock.id)}>
			Удалить
		</button>
	);
};
