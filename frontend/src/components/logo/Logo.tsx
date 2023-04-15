import styles from './styles.module.scss';

function Logo() {
  return (
    <a href="/" className={styles.container}>
      <img src="logo.svg" alt="logo" className={styles.logo} />
      <h1 className={styles.name}>Textio</h1>
    </a>
  );
}

export default Logo;
