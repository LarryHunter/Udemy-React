import styles from './Logo.module.css';

function Logo() {
  return (
    <div>
      <a href='/'>
        <img
          src='/logo.png'
          alt='WorldWise logo'
          className={styles.logo}
        />
      </a>
    </div>
  );
}

export default Logo;
