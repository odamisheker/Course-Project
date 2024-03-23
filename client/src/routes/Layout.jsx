import { Link, Outlet } from "react-router-dom";
import styles from "../styles/Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.main}>
      {/* <h3 className={styles.title}>SESSION</h3>
      <Link to="/login" className={styles.link}>
          Log in messenger 
      </Link> */}
      <Outlet />
    </div>
  );
}
