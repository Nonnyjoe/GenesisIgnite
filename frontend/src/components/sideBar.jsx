import Link from "next/link";
import styles from "../styles/sidebar.module.css";
import styles2 from "../styles/aboutUs.module.css";

const Sidebar = (props) => {
  const { check } = props;

  return (
    <div className={`${styles.sidebar} font-pop`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={`${styles.item} ${check == 1 ? styles.active : ""}`}>
            <div className="flex flex-row gap-6">
              <div className={`${styles.dashboard} w-7 h-7 mt-[.5rem]`}></div>
              <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
            </div>
          </li>
          <li className={`${styles.item} ${check == 2 ? styles.active : ""}`}>
            <div className="flex flex-row gap-6">
              <div className={`${styles.Swappad} w-7 h-7 mt-[.5rem] `}></div>
              <Link href="/swapPad">
                <a>Swappad</a>
              </Link>
            </div>
          </li>
          <li className={`${styles.item} ${check == 3 ? styles.active : ""}`}>
            <div className="flex flex-row gap-6">
              <div className={`${styles.Launch} w-7 h-7 mt-[.5rem] `}></div>
              <Link href="/launchpad">
                <a>LaunchPad</a>
              </Link>
            </div>
          </li>
          <li className={`${styles.item} ${check == 4 ? styles.active : ""}`}>
            <div className="flex flex-row gap-6">
              <div className={`${styles.presale} w-7 h-7 mt-[.5rem]`}></div>
              <Link href="/presale">
                <a>Presale</a>
              </Link>
            </div>
          </li>
           <li className={`${styles.item} ${check == 6 ? styles.active : ""}`}>
            <div className="flex flex-row gap-6">
              <div className={`${styles.dao} w-7 h-7 mt-[.5rem]`}></div>
              <Link href="/dao">
                <a>Governance</a>
              </Link>
            </div>
          </li>
          <li className={`${styles.item} ${check == 5 ? styles.active : ""}`}>
            <div className="flex flex-row gap-6">
              <div className={`${styles.p2p} w-7 h-7 mt-[.5rem]`}></div>
              <Link href="/p2p">
                <a>P2P</a>
              </Link>
            </div>
          </li>
         
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
