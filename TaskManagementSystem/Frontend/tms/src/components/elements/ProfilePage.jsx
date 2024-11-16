// src/ProfilePage.js
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, Button, Input, Textarea } from '../ui';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        bio: 'Software Developer | Tech Enthusiast | Coffee Lover',
        location: 'San Francisco, CA',
        email: 'john.doe@example.com',
        website: 'https://johndoe.com',
        joined: 'January 2020',
        profilePicture: 'profile-picture.jpg', // Replace with actual image URL
    });

    const [editing, setEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUser({ ...user, profilePicture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setEditing(false);
        // Here you would typically save the updated user data to your backend
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-96">
                <CardHeader>
                    <div className="text-center">
                        <img src={user.profilePicture} alt="Profile Picture" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                        {editing ? (
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mb-4"
                            />
                        ) : null}
                        {editing ? (
                            <Input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleInputChange}
                                className="mb-4"
                            />
                        ) : (
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                        )}
                        {editing ? (
                            <Textarea
                                name="bio"
                                value={user.bio}
                                onChange={handleInputChange}
                                className="mb-4"
                            />
                        ) : (
                            <p className="text-gray-600">{user.bio}</p>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-6">
                        <div className="flex items-center mb-2">
                            <span className="font-bold w-24">Location:</span>
                            <span className="text-gray-700">{user.location}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <span className="font-bold w-24">Email:</span>
                            <span className="text-gray-700">{user.email}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <span className="font-bold w-24">Website:</span>
                            <span className="text-gray-700">
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    {user.website}
                                </a>
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold w-24">Joined:</span>
                            <span className="text-gray-700">{user.joined}</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    {editing ? (
                        <div className="flex justify-between">
                            <Button onClick={handleSave}>Save</Button>
                            <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                        </div>
                    ) : (
                        <div className="flex justify-between">
                            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
                            <Button variant="secondary">Change Password</Button>
                        </div>
                    )}
                    <div className="">
                        <Link to="/dashboard" className="text-blue-500 hover:underline">
                            <Button variant="secondary " className='bg-gray-900 hover:bg-gray-700'><ChevronLeft color='white' /></Button>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProfilePage;