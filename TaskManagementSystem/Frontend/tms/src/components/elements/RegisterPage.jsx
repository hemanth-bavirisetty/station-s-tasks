import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            username: '',
            first_name: '',
            last_name: '',
            password: '',
            passwordAgain: '',
        }
    });
    const [formStatus, setFormStatus] = useState('');

    const onSubmit = async (data) => {
        try {
            console.log(data)
            if (data.password !== data.passwordAgain) {
                setFormStatus('Passwords do not match');
                return;
            }
            const userData = {
                email: data.email,
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                password: data.password,
            };
            const response = await axios.post('http://localhost:8000/api/register/', userData);
            setFormStatus('Form submitted successfully! go to login');
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setFormStatus(`An error occurred while submitting the form.${error?.AxiosError?.response?.request.response ?? ' '}`);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="username"
                            {...register('username', {
                                required: 'Username is required',
                            })}
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">First Name</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="first_name"
                            {...register('first_name', {
                                required: 'First name is required',
                            })}
                        />
                        {errors.first_name && <p className="text-red-500 text-xs italic">{errors.first_name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">Last Name</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="last_name"
                            {...register('last_name', {
                                required: 'Last name is required',
                            })}
                        />
                        {errors.last_name && <p className="text-red-500 text-xs italic">{errors.last_name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordAgain">Password Again</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="passwordAgain"
                            {...register('passwordAgain', {
                                required: 'Password again is required',
                            })}
                        />
                        {errors.passwordAgain && <p className="text-red-500 text-xs italic">{errors.passwordAgain.message}</p>}
                        {formStatus === 'Passwords do not match' && <p className="text-red-500 text-xs italic">{formStatus}</p>}
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register
                        </button>
                        <Link to="/login" className="text-blue-500 hover:text-blue-700">
                            Already have an account? Login
                        </Link>
                    </div>
                    <div className="mt-4">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => window.history.back()}
                        >
                            <ArrowRight className="mr-2" />
                            Back
                        </button>
                    </div>
                    {formStatus && formStatus !== 'Passwords do not match' && (
                        <p className="text-green-500 text-xs italic">{formStatus}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
