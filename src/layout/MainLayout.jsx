import { Outlet } from "react-router-dom"
import Navbar from "../components/headers/Navbar"
import Footer from "../pages/Home/Footer/Footer"


const MainLayout = () => {
  return (
    <main className='overflow-hidden dark:bg-black'>
         <Navbar/>
      <Outlet/>
      <footer><Footer/></footer>
    </main>
  )
}

export default MainLayout
