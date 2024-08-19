import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav id={styles.navBar}>
      <Link className={styles.logoNav} to='/'>
        <img src='../../../public/vrfood.jpg' alt='vrfood' />
      </Link>

      <ul className={styles.navLinks}>
        <li>
          <NavLink to='/products'>Produtos</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
