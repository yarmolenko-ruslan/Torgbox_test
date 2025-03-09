import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ClockProps } from 'types/types';
import { DigitalTime } from 'components/DigitalTime/DigitalTime';
import { TimezoneSelect } from 'components/TimezoneSelect/TimezoneSelect';
import { RootState } from 'store/store';
import { useActions } from 'hooks/useActions';
import { DeleteButton } from 'components/DeleteButton/DeleteButton';
import { CityName } from 'components/CityName/CityName';
import styles from './clock.module.scss';

export const Clock: React.FC<ClockProps> = ({ clock }) => {
	const { updateClockTimezone } = useActions();
	const { timezones, clocks } = useSelector((state: RootState) => state.clocks);
	const [time, setTime] = useState<Date>(new Date());

	useEffect(() => {
		const updateClock = () => {
			const now = new Date();
			if (clock.timezone) {
				const utc = now.getTime() + now.getTimezoneOffset() * 60000;
				const newTime = new Date(utc + clock.timezone.offset * 60000);
				setTime(newTime);
			} else {
				setTime(now);
			}
		};

		updateClock();
		const interval = setInterval(updateClock, 1000);
		return () => clearInterval(interval);
	}, [clock]);

	const addedCityIds = useMemo(
		() => new Set(clocks.map(c => c.timezone.id)),
		[clocks]
	);

	const availableTimezones = useMemo(
		() =>
			timezones.filter(
				tz => !addedCityIds.has(tz.id) || tz.id === clock.timezone.id
			),
		[timezones, addedCityIds, clock.timezone.id]
	);

	const handleChangeTimezone = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newTimezone = timezones.find(tz => tz.id === Number(e.target.value));
		if (newTimezone) {
			updateClockTimezone({ clockId: clock.id, newTimezone });
		}
	};

	const hourRotation =
		(time.getHours() % 12) * 30 + (time.getMinutes() / 60) * 30;
	const minuteRotation = time.getMinutes() * 6;
	const secondRotation = time.getSeconds() * 6;

	return (
		<li className={styles.container}>
			<CityName clock={clock} />

			<div className={styles.clock}>
				{[...Array(12)].map((_, i) => (
					<div
						key={i}
						className={styles.mark}
						style={{ transform: `rotate(${i * 30}deg)` }}
					></div>
				))}
				<div
					className={styles.handHour}
					style={{ transform: `rotate(${hourRotation}deg)` }}
				></div>
				<div
					className={styles.handMinute}
					style={{ transform: `rotate(${minuteRotation}deg)` }}
				></div>
				<div
					className={styles.handSecond}
					style={{ transform: `rotate(${secondRotation}deg)` }}
				></div>
				<div className={styles.axis}></div>
			</div>

			<DigitalTime time={time} />
			<TimezoneSelect
				handleChangeTimezone={handleChangeTimezone}
				availableTimezones={availableTimezones}
				clock={clock}
			/>
			<DeleteButton clock={clock} />
		</li>
	);
};
