import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
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
        <div className="flex justify-center items-center h-full  lg:py-10 lg:px-2 mx-auto bg-gradient-to-br
from-red-500/50 
via-yellow-500/50 
via-green-500/50 
to-blue-500/50  shadow-md p-6">
            <Card className="w-full h-full max-w-md p-4 sm:p-6 md:p-8">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold mb-4">Register</CardTitle>
                    <CardDescription className="text-md">Create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4 ">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                placeholder="Enter Email"
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
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                placeholder="Enter Username"
                                id="username"
                                {...register('username', {
                                    required: 'Username is required',
                                })}
                            />
                            {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="first_name">First Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter First Name"
                                id="first_name"
                                {...register('first_name', {
                                    required: 'First name is required',
                                })}
                            />
                            {errors.first_name && <p className="text-red-500 text-xs italic">{errors.first_name.message}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="last_name">Last Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter Last Name"
                                id="last_name"
                                {...register('last_name', {
                                    required: 'Last name is required',
                                })}
                            />
                            {errors.last_name && <p className="text-red-500 text-xs italic">{errors.last_name.message}</p>}
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter Password"
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
                            <Label htmlFor="passwordAgain">Password Again</Label>
                            <Input
                                type="password"
                                placeholder="Repeat Password"
                                id="passwordAgain"
                                {...register('passwordAgain', {
                                    required: 'Password again is required',
                                })}
                            />
                            {errors.passwordAgain && <p className="text-red-500 text-xs italic">{errors.passwordAgain.message}</p>}
                            {formStatus === 'Passwords do not match' && <p className="text-red-500 text-xs italic">{formStatus}</p>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center">
                    <Button type="submit" onClick={handleSubmit(onSubmit)} className="w-full sm:w-auto">
                        Register
                    </Button>
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 w-full text-center sm:w-auto">
                        Already have an account? Login
                    </Link>
                </CardFooter>
                <CardFooter className="flex justify-center">
                    <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
                        <ArrowLeft className="mr-2" />
                        Back
                    </Button>
                </CardFooter>
                {formStatus && formStatus !== 'Passwords do not match' && (
                    <p className="text-green-500 text-xs italic text-center mt-4">{formStatus}</p>
                )}
            </Card>
        </div>
    );
};

export default RegisterPage;