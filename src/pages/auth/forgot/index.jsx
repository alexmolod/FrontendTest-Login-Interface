import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import styles from './styles.module.scss';

const Forgot = () => {
  const navigate = useNavigate();

  const validate = (values) => {
    const { email } = values;
    const errors = {};

    if (!email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const onSubmit = (values) => {
    const userData = {
      email: values.email,
    };
    axios
      .post('https://auth-qa.qencode.com/v1/auth/password-reset', userData)
      .then((response) => {
        console.log(response);
        navigate('/create-new-pass');
      })
      .catch((error) => {
        if (error.response) {
          // eslint-disable-next-line no-alert
          alert(error?.response?.data?.detail);
          // TODO: this is a stub, since I don't have a user in the system, and the secret is not
          // returned to me. It is necessary to be able to check the Create new Password screen
          navigate('/create-new-pass');
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
      <div className={styles.title}>Forgot Password?</div>

      <Input
        name="email"
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        placeholder="Enter your email"
        showError={touched.email && errors.email}
      />

      <Button
        isFullWidth
        text="Send"
        type="submit"
        view="primary"
        className={styles.accept_btn}
      />
      <Button isFullWidth text="Cancel" view="secondary" onClick={() => navigate('/')} />
    </form>

  );
};

export default Forgot;
