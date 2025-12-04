import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import styles from './PageNotFound.module.css';

export default function PageNotFound() {
  return (
    <div className={styles.pagenotfound}>
      <Link to='/'>
        <Logo />
      </Link>

      <h1>💥 404 Page Not Found 🥺</h1>
      <h2>Check that you typed the address correctly or go back to the previous page</h2>
    </div>
  );
}
