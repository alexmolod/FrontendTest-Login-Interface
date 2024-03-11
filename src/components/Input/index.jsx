import React, { useMemo, useState } from 'react';
import cn from 'classnames';

import eyeImg from '../../assets/img/pass-eye.svg';

import styles from './styles.module.scss';

const Input = ({
  name,
  value,
  title,
  error,
  isPass,
  onChange,
  showError,
  className,
  placeholder,
}) => {
  const [showPass, setShowPass] = useState(!isPass);
  const inputStyles = useMemo(() => cn(styles.input, className), [className]);

  return (
    <div className={styles.wrapper_input}>
      {title && <p className={styles.title}>{title}</p>}
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={inputStyles}
        placeholder={placeholder}
        autoComplete="new-password"
        type={showPass ? 'text' : 'password'}
      />
      {isPass && (
        <div className={styles.wrapper_icon}>
          <img src={eyeImg} onClick={() => setShowPass(!showPass)} alt="icon" />
        </div>
      )}
      {showError && (
        <span className={styles.error}>{error}</span>
      )}
    </div>
  );
};

export default Input;
