import React from 'react'
import styles from './Navbar.module.css';
import { Logout } from '../login/Logout'

export const Navbar: React.FC = () => {

  return (
    <nav>
      <section>
        <h1>Wall App</h1>

        <div className={styles.nav_content}>
          <div className={styles.nav_links}></div>
           <Logout />
        </div>
      </section>
    </nav>
  )
}