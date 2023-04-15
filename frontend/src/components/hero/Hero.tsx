import { Suspense } from 'react';
import styles from './styles.module.scss';
import { Canvas, useFrame } from '@react-three/fiber';
import Sphere from '../sphere/Sphere';
import Loading from '~/components/loading/Loading';
import { OrbitControls } from '@react-three/drei';

/**
 * Hero section
 */
function Hero() {
  return (
    <section>
      <div className={styles.left}>
        {/* Sphere */}
        <div className={styles['sphere-container']}>
          <Suspense fallback={<Loading />}>
            <Canvas>
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <pointLight position={[0, 0, 10]} intensity={1} />
              <Sphere position={[0, 0, 0]} />
              <OrbitControls enableZoom={false} />
            </Canvas>
          </Suspense>
        </div>
      </div>
      <div className={styles.right}>
        {/* Call to action */}
        <h1>Build your dream model</h1>
        <p>
          Lowest prices in all the industry. <br /> Convice yourself by looking
          at more of our products.
        </p>
        <button>Pick up now</button>
      </div>
    </section>
  );
}

export default Hero;
