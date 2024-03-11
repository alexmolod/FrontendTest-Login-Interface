import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

const Button = ({
  icon,
  text,
  onClick,
  className,
  type = 'button',
  view = 'primary',
  isFullWidth = false,
}) => {
  const wrapperStyles = cn(styles.wrapper_button, className, styles[`type_${view}`], {
    [styles.icon]: icon,
    [styles.full_width]: isFullWidth,
  });

  const onClickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  /* eslint-disable react/button-has-type */
  return (
    <button
      type={type}
      onClick={onClickHandler}
      className={wrapperStyles}
    >
      {icon && <img src={icon} className={styles.icon} alt="icon" />}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
