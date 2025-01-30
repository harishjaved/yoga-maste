import React from 'react'
import bgImg from '../../../assets/home/banner-1.jpg'
import { useNavigate } from 'react-router-dom'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Hero = () => {
  const navigate = useNavigate();
  
  const handleViewCourse = () => {
    navigate('/classes');
  }
  
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg})`}}>
        <div className='flex items-center justify-start min-h-screen text-white bg-black pl-11 bg-opacity-60'>
            <div>
                <div className='space-y-4'>
                   <p className='text-2xl md:text-4xl'>We Provide</p>
                   <h1 className='text-4xl font-bold md:text-7xl'>Best Yoga Course Online</h1>
                   <div className='md:w-1/2'>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Maxime voluptatem quidem commodi quibusdam molestiae animi, necessitatibus possimus dicta ad dolores. 
                        Nostrum itaque dignissimos modi aliquam illo nam iste incidunt provident.</p>
                   </div>
                   <div className='flex flex-wrap items-center gap-5'>
                    <button className='py-3 font-bold uppercase rounded-lg px-7 bg-secondary'>Join Today</button>
                    <button className='py-3 font-bold uppercase border rounded-lg px-7 hover:bg-secondary' onClick={handleViewCourse} >View Course</button>
                   </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Hero
