import React from 'react';
import { useState } from 'react';
import { Heart } from "lucide-react";
import { Link } from 'react-router-dom';
import { GlobeDemo } from './GlobeDemo';
import Globe from "@/components/ui/globe";


const LandingPage = () => {


  return (

    <div className="bg-gradient-to-b from-[#2962FF] to-white h-screen w-screen">
      <div className=" mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24 ">

        <div className="w-full lg:w-1/2  p-6 ">
          <h1 className="text-[70px] text-white font-bold font-montserrat">Take Control of Your Workflow with Task Manager</h1>
          <p className="text-2xl text-white font-open-sans">Streamline your tasks, boost productivity, and stay organized with our intuitive task management system.</p>
          <div className='py-10'>
            <Link to="/register"><button className="bg-[#4CAF50]  hover:bg-[#3e8e41] text-white font-bold py-2 px-4 rounded font-montserrat">Register for Free</button></Link>
            <Link to='login'><button className="bg-white hover:bg-gray-100 text-[#2962FF] font-bold py-2 px-4 rounded border border-[#2962FF] font-montserrat ml-4">Login</button></Link>
          </div>
        </div>
        <Globe className="top-28" />
        <div className=''>
          <GlobeDemo />
        </div>

      </div>

    </div>




  );
};

export default LandingPage;
