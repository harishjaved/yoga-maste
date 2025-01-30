import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallary from './Gallary/Gallary'
import PopularClasses from './PopularClasses/PopularClasses'
import PopularTeacher from './PopularTeacher/PopularTeacher'
import useAuth from '../../hooks/useAuth'
import StatsSection from './PopularTeacher/StatsSection'

const Home = () => {
    // const {user} = useAuth();
    // console.log(user)import.meta.env.VITE_APIKEY
  return (
    <div>
     <HeroContainer />
     <div className='max-w-screen-xl mx-auto'>
      <Gallary />
      <PopularClasses />
      <PopularTeacher />
     </div>
     <StatsSection/>
    </div>
  )
}

export default Home
