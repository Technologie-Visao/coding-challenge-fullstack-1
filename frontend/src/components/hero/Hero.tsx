import React from 'react';
import styles from './styles.module.scss';

function Hero() {
  return (
    <section>
      <div className={styles.left}>Left</div>
      <div className={styles.right}>Right</div>
    </section>
  );
}

export default Hero;
