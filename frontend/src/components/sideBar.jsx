import Link from 'next/link';
import styles from '../styles/sidebar.module.css';
import  styles2  from "../styles/aboutUs.module.css"



function Sidebar() {



  return (
    <div className={`${styles.sidebar} font-pop`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className='flex flex-row gap-6'>
            <div className={`${styles.dashboard} w-7 h-7 mt-[.5rem]`}></div>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
            </div>
          </li>
          <li className={styles.item}>
            <div className='flex flex-row gap-6'>
            <div className={`${styles.Swappad} w-7 h-7 mt-[.5rem]`}></div>
            <Link href="/swapPad">
              <a>Swappad</a>
            </Link>
            </div>
          </li>
          <li className={styles.item}>
            <div className='flex flex-row gap-6'>
            <div className={`${styles.Launch} w-7 h-7 mt-[.5rem]`}></div>
            <Link href="/">
              <a>LaunchPad</a>
            </Link>
            </div>
          </li>
          <li className={styles.item}>
            <div className='flex flex-row gap-6'>
            <div className={`${styles.presale} w-7 h-7 mt-[.5rem]`}></div>
            <Link href="/">
              <a>Presale</a>
            </Link>
            </div>
          </li>
           <li className={`${styles.item} `}>
            <div className='flex flex-row gap-6'>
            <div className={`${styles.p2p} w-7 h-7 mt-[.5rem]`}></div>
            <Link href="/">
              <a>P2P</a>
            </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
