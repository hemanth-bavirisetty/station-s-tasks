import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
// import { Heart } from "lucide-react";
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Input } from "@/components/ui";
import { Label } from "@/components/ui";
import { Button } from "@/components/ui";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [loading, setLoading] = useState(false);
  const { login, setAccessTk } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login/', data);
      setLoading(false);
      // Handle successful login
      const accessToken = response.data?.access ?? ' ';
      setAccessTk(accessToken);
      console.log(accessToken);
      console.log(response);
      console.log('Login successful');
      login();
      navigate('/dashboard', { replace: true });
      // You can redirect the user to a protected route here
    } catch (error) {

      setLoading(false);
      console.log(error);
      setError('username', { type: 'custom', message: 'Invalid username or password' });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  mx-auto bg-gradient-to-br
from-red-500/50 
via-yellow-500/50 
via-green-500/50 
to-blue-500/50  shadow-md p-6">
      
        
        <div className=" bg-white rounded-lg w-full max-w-md p-2">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-2">Login</CardTitle>
          <CardDescription className="text-md">Welcome back! Please enter your details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                placeholder="Enter your username"
                id="username"
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
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-1">{errors.username.message}</div>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                id="password"
                {...register('password', {
                  required: 'Please fill in this field',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long'
                  }
                })}
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
              )}
            </div>
            <div className="mb-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </div>
            <div className='lg:flex'>
              <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center">
                  
                  <Link to="/register" className="text-blue-500 hover:text-blue-700 w-full text-center sm:w-auto">
                      Create an account? Register
                  </Link>
              </CardFooter>
              <CardFooter className="flex justify-center">
                  <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
                      <ArrowLeft className="mr-2" />
                      Back
                  </Button>
              </CardFooter>
              </div>
          </form>
        </CardContent>
      </div>
        </div>
    
      
    
  );
};

export default LoginPage;