import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import styles from './styles.module.scss';

const Create = () => {
  const navigate = useNavigate();

  const validate = (values) => {
    const { password, confirmPass } = values;
    const errors = {};

    if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters long';
    }

    if (password !== confirmPass) {
      errors.confirmPass = 'Password and Confirm password should be the same';
    }

    if (confirmPass.length < 8) {
      errors.confirmPass = 'Confirm password should be at least 8 characters long';
    }

    return errors;
  };

  const onSubmit = (values) => {
    const userData = {
      password: values.password,
      // TODO: I think this is returned value from /password-reset response, but I dont have user for check this
      token: 'token',
      secret: 'secret',
    };
    axios
      .post('https://auth-qa.qencode.com/v1/auth/password-set', userData)
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('Password reset successfully');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log('error', error);
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
      password: '',
      confirmPass: '',
    },
    validate,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const {
    values, errors, touched, handleChange, handleSubmit,
  } = formik;

  return (
    <form onSubmit={handleSubmit}>

      <div className={styles.title}>Create new Password?</div>

      <Input
        isPass
        name="password"
        title="Password"
        placeholder="Password"
        value={values.password}
        error={errors.password}
        onChange={handleChange}
        showError={touched.password && errors.password}
      />
      <Input
        isPass
        name="confirmPass"
        placeholder="Password"
        onChange={handleChange}
        title="Confirm Password"
        value={values.confirmPass}
        error={errors.confirmPass}
        showError={touched.confirmPass && errors.confirmPass}
      />

      <Button
        isFullWidth
        type="submit"
        view="primary"
        text="Reset Password"
      />
    </form>
  );
};
export default Create;
