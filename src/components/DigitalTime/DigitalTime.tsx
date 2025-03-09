import { DigitalTimeProps } from 'types/types';
import styles from './digitalTime.module.scss';

export const DigitalTime: React.FC<DigitalTimeProps> = ({ time }) => {
	return (
		<p className={styles.digitalTime}>
			{time.toLocaleTimeString('ru-RU', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			})}
		</p>
	);
};
