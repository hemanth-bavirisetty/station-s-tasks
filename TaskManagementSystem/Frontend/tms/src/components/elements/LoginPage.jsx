import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { Heart } from "lucide-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [loading, setLoading] = useState(false);
  const { login, setAccessTk} = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login/', data);
      setLoading(false);
      // Handle successful login
      const accessToken = response.data?.access ?? ' '
      setAccessTk(accessToken);
      console.log(accessToken)
      console.log(response)
      console.log('Login successful');
      login()
      navigate('/dashboard', { replace: true });
      // You can redirect the user to a protected route here
    } catch (error) {
      setLoading(false);
      setError('username', { type: 'custom', message: 'Invalid username or password' });
    };
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              {...register('username', {
                required: 'Please fill in this field',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters long'
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be at most 20 characters long'
                }
              })}
              placeholder="username"
            />
            {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              {...register('password', {
                required: 'Please fill in this field',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                }
              })}
              placeholder="********"
            />
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="flex justify-between">
          <a
            className="text-blue-500 hover:text-blue-700"
            href="/register"
          >
            Register
          </a>
          <a
            className="text-blue-500 hover:text-blue-700"
            href="/"
          >
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
