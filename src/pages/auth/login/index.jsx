import React from 'react';
import axios from 'axios';
import cn from 'classnames';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import googleLogo from '../../../assets/img/logo/google.png';
import githubLogo from '../../../assets/img/logo/github.png';

import styles from './styles.module.scss';

const socialsData = [
  {
    title: 'Google',
    icon: googleLogo,
  },
  {
    title: 'Github',
    icon: githubLogo,
  },
];

const Login = () => {
  const navigate = useNavigate();

  const validate = (values) => {
    const { email, password } = values;
    const errors = {};

    if (!email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters long';
    }

    return errors;
  };

  const onSubmit = (values) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    axios
      .post('https://auth-qa.qencode.com/v1/auth/login', userData)
      .then((response) => {
        console.log(response);
        navigate('/dashboard');
      })
      .catch((error) => {
        if (error.response) {
          // eslint-disable-next-line no-alert
          alert(error?.response?.data?.detail[0]?.error);
        } else if (error.request) {
          // eslint-disable-next-line no-alert
          alert('network error');
        } else {
          console.log(error);
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const {
    values, errors, touched, handleChange, handleSubmit,
  } = formik;

  const showPass = values.email && !errors.email;

  const socials = socialsData.map((social) => (
    <Button
      view="secondary"
      icon={social.icon}
      key={social.title}
      text={social.title}
      className={styles.socials_button}
    />
  ));

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.title}>Log in to your account</div>

      <div className={styles.socials}>{socials}</div>

      <div className={styles.divider}>or</div>

      <Input
        name="email"
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        placeholder="Work email"
        showError={touched.email && errors.email}
      />

      <div className={cn(styles.pass, { [styles.show_pass]: showPass })}>
        <Input
          isPass
          name="password"
          placeholder="Password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          showError={touched.password && errors.password}
        />

        <div className={styles.wrapper_link}>
          <a className={styles.link} href="/forgot-pass">
            Forgot your password?
          </a>
        </div>
      </div>

      <Button type="submit" isFullWidth text="Log in to Qencode" view="primary" />

      <div className={styles.after_text}>
        Is your company new to Qencode?
        <a className={styles.link} href="/sign-up">
          Sign up
        </a>
      </div>
    </form>
  );
};

export default Login;
