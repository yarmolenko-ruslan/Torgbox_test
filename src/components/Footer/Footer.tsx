import styles from './footer.module.scss';

export const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<p className={styles.text}>© Ярмоленко Руслан, 2025</p>
		</footer>
	);
};
