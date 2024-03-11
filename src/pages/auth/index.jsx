import React from 'react';

import logo from '../../assets/img/logo/logo.png';

import styles from './styles.module.scss';

const Auth = ({ children }) => (
  <div className={styles.auth_wrapper}>
    <div className={styles.auth}>

      <div className={styles.logo_wrapper}>
        <img src={logo} className={styles.logo} alt="logo" />
      </div>

      {children}

    </div>
  </div>
);

export default Auth;
