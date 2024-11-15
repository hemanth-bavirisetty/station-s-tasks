import React from 'react';
import { useState } from 'react';
import { Heart } from "lucide-react";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);

  const features = [
    {
      title: 'Task Prioritization',
      description: 'Prioritize tasks based on importance and deadlines.',
      icon: <Heart className="text-[#2962FF] w-8 h-8 mb-4" />,
    },
    {
      title: 'Project Management',
      description: 'Create and manage projects with clear task assignments.',
      icon: <Heart className="text-[#2962FF] w-8 h-8 mb-4" />,
    },
    {
      title: 'Collaboration',
      description: 'Collaborate with team members on tasks and share progress updates.',
      icon: <Heart className="text-[#2962FF] w-8 h-8 mb-4" />,
    },
    {
      title: 'Calendar Integration',
      description: 'Integrate with your calendar to track deadlines and schedule meetings.',
      icon: <Heart className="text-[#2962FF] w-8 h-8 mb-4" />,
    },
  ];

  const testimonials = [
    {
      quote: 'TaskMaster has been a game-changer for our team. We\'re able to prioritize tasks and collaborate more effectively.',
      author: 'John Doe, CEO',
    },
    {
      quote: 'TaskMaster has helped us streamline our workflow and reduce stress. We\'re able to focus on what matters most.',
      author: 'Jane Smith, Marketing Manager',
    },
    {
      quote: 'TaskMaster is intuitive and easy to use. We\'re able to onboard new team members quickly and efficiently.',
      author: 'Bob Johnson, IT Manager',
    },
  ];

  const benefits = [
    'Increased productivity and efficiency',
    'Improved team communication and collaboration',
    'Reduced stress and better time management',
    'Enhanced task visibility and accountability',
    'Data-driven insights for better decision-making',
  ];

  return (

    <div className="bg-gradient-to-b from-[#2962FF] to-white h-screen w-screen">
      <div className=" mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">

        <div className="w-full lg:w-1/2  p-6 ">
          <h1 className="text-[70px] text-white font-bold font-montserrat">Take Control of Your Workflow with Task Manager</h1>
          <p className="text-2xl text-white font-open-sans">Streamline your tasks, boost productivity, and stay organized with our intuitive task management system.</p>
          <div className='py-10'>
            <Link to="/register"><button className="bg-[#4CAF50]  hover:bg-[#3e8e41] text-white font-bold py-2 px-4 rounded font-montserrat">Register for Free</button></Link>
            <Link to='login'><button className="bg-white hover:bg-gray-100 text-[#2962FF] font-bold py-2 px-4 rounded border border-[#2962FF] font-montserrat ml-4">Login</button></Link>
          </div>
        </div>

      </div>

    </div>




  );
};

export default LandingPage;
