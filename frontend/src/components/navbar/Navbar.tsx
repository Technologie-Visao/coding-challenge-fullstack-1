import Logo from '../logo/Logo';
import SearchBar from '../search-bar/SearchBar';
import styles from './styles.module.scss';

/**
 * Navbar
 */
function Navbar() {
  return (
    <nav className={styles.container}>
      <Logo />
      <SearchBar />
    </nav>
  );
}

export default Navbar;
