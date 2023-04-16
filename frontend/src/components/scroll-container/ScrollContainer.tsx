import styles from './styles.module.scss';

type ScrollContainerProps = {
  children: React.ReactNode;
};

/**
 * Container with no scrollbar
 */
function ScrollContainer({ children }: ScrollContainerProps) {
  return <div className={styles.container}>{children}</div>;
}

export default ScrollContainer;
