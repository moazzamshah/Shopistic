import React from "react";
import { useForm } from "react-hook-form";
import "../css/login.css";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const Login = () => {
  // YUP validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = (data) => {
    // display form data on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
  }
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          type="text"
          {...register('email')}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </div>
      {/* Password */}
      <div className="form-group">
        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register('password')}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.password?.message}</div>
      </div>
      {/* Button */}
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};


