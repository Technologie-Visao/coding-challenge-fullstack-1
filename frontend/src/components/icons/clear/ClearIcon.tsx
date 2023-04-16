import styles from './styles.module.scss';

function ClearIcon({ hide = false, onClick = () => {} }) {
  if (hide) return <></>;
  return <img src="x-icon.svg" className={styles.icon} onClick={onClick} />;
}

export default ClearIcon;
