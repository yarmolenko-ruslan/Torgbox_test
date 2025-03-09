import { ClockProps } from 'types/types';
import styles from './cityName.module.scss';

export const CityName = ({ clock }: ClockProps) => {
	return <p className={styles.city}>{clock.timezone.city}</p>;
};
