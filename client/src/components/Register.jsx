import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const Register = () => {
    // YUP validation
    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Fullname is required'),
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });


    /* 
    The useForm() hook function returns an object that we use following methods:
    register: register inputs
    handleSubmit: handle form submit
    reset:reset the form
    */
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
            {/* Name */}
            <div className="form-group">
                <label>Full Name</label>
                <input
                    name="fullname"
                    type="text"
                    {...register('fullname')}
                    className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.fullname?.message}</div>
            </div>
            {/* Username */}
            <div className="form-group">
                <label>Username</label>
                <input
                    name="username"
                    type="text"
                    {...register('username')}
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
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
            {/* Confirm Password */}
            <div className="form-group">
                <label>Confirm Password</label>
                <input
                    name="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''
                        }`}
                />
                <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                </div>
            </div>
            {/* Terms */}
            <div className="form-group form-check">
                <input
                    name="acceptTerms"
                    type="checkbox"
                    {...register('acceptTerms')}
                    className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''
                        }`}
                />
                <label htmlFor="acceptTerms" className="form-check-label">
                    Accept Terms & Conditions
                </label>
                <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
            </div>
            {/* Button */}
            <div className="form-group">
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
                <button
                    type="button"
                    onClick={reset}
                    className="btn btn-warning float-right"
                >
                    Reset
                </button>
            </div>
            <p className="forgot-password text-left">
                Already registered <a href="/login">Login?</a>
            </p>
        </form>
    )
}
