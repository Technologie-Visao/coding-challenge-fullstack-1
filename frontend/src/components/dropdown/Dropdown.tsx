import styles from './styles.module.scss';

type DropdownProps = {
  children: React.ReactNode;
};
function Dropdown({ children }: DropdownProps) {
  return <div className={styles.dropdown}>{children}</div>;
}

export default Dropdown;
