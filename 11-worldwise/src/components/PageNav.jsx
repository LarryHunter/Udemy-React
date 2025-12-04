import { Link, NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo';

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Link to='/'>
        <Logo />
      </Link>
      <ul>
        <li>
          <h3>
            <NavLink to='/pricing'>Pricing</NavLink>
          </h3>
        </li>
        <li>
          <h3>
            <NavLink to='/product'>Product</NavLink>
          </h3>
        </li>
        <li>
          <h3>
            <NavLink
              className={styles.ctaLink}
              to='/login'>
              Login
            </NavLink>
          </h3>
        </li>
      </ul>
    </nav>
  );
}
