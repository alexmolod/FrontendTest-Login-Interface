import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Auth from '../auth';
import Error from '../404';
import Login from '../auth/login';
import Forgot from '../auth/forgot';
import Create from '../auth/create';
import Dashboard from '../dashboard';

import styles from './styles.module.scss';

const App = () => (
  <div className={styles.app}>
    <Auth>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-pass" element={<Forgot />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-new-pass" element={<Create />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Auth>
  </div>
);

export default App;
