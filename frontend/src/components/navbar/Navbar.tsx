import SearchBar from '../search-bar/SearchBar';
import styles from './styles.module.scss';

/**
 * Navbar
 */
function Navbar() {
  return (
    <nav className={styles.container}>
      <h1>Textio</h1>
      <SearchBar />
    </nav>
  );
}

export default Navbar;
