import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import img from '../../../assets/home/girl.jpg'

const PopularTeacher = () => {
    const [instructors, setInstructors] = useState([]);
    const axiosFetch = useAxiosFetch();
    
    useEffect(() => {
        console.log("HYYYY");
        
        axiosFetch.get('/popular-instructors').then((data) => {
            setInstructors(data.data)
            console.log("HYY");
            console.log(data);
            
            
        }).catch((err) => {console.log(err)});
        
    },[])
    // console.log(instructors);
    
  return (
    <div className='md:w-[80%] mx-auto my-36'>
        <div>
            <h1 className='text-5xl font-bold text-center'>Our <span className='text-secondary'>Best</span> Instructors </h1>
            <div className='w-[40%] text-center mx-auto my-4'>
                <p className='text-gray-500'>
                    Explore our Popular classes. Here is some popular classes based on how many students enrolled.
                </p>
            </div>
        </div>
        
 
             {
                instructors ? <>
                <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-4 mx-auto'>
                    {
                        instructors?.map((instructor, i) => (
                            <div key={i} className='flex flex-col px-10 py-8 duration-200 rounded-md shadow-md cursor-pointer dark:text-white hover:translate-y-2 md:px-8 '>
                                   <div className='flex flex-col gap-6 md:gap-8'>
                                            <img className='w-24 h-24 mx-auto border-4 border-gray-300 rounded-full ' src={instructor?.instructors?.photoUrl || `${img}`} alt="" />
                                   
                                        <div className='flex flex-col text-center'>
                                            <p className='text-lg font-medium text-gray-800 dark:text-white'>{instructor?.instructor?.name}</p>
                                            <p className='text-gray-500 whitespace-nowrap'>Instructor</p>
                                            <p className='mb-4 text-gray-500 whitespace-nowrap'>Total Students: {instructor?.totalEnrolled}</p>
                                            <div className='flex justify-center gap-5 '>
                                                <p><FaLinkedin /></p>
                                                <p><FaFacebook /></p>
                                                <p><FaInstagram /></p>
                                            </div>
                                        </div>
                                       
                                       
                                    </div>
                                    
                                </div>
                        ))
                    }
                </div>
                </> :  <><p>No Instructors available</p></>
            }
        </div>
      
    
  )
}

export default PopularTeacher
