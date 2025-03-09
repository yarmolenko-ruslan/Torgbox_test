import { TimezoneSelectProps } from 'types/types';
import styles from './timezoneSelect.module.scss';

export const TimezoneSelect: React.FC<TimezoneSelectProps> = ({
	handleChangeTimezone,
	availableTimezones,
	clock,
}) => {
	return (
		<select
			value={clock.timezone.id}
			onChange={handleChangeTimezone}
			className={styles.select}
		>
			{availableTimezones.map(tz => (
				<option className={styles.options} key={tz.id} value={tz.id}>
					{tz.city}
				</option>
			))}
		</select>
	);
};
