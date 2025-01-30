import { useContext, useEffect } from "react"
import { AuthContext } from "../ultilities/providers/AuthProvider"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const useAxiosSecure = () => {
 const {logout} = useContext(AuthContext)
 const navigate = useNavigate()

 const axiosSecure = axios.create({
    baseURL: 'https://yoga-master-server-slrk.onrender.com/',
    
  });

  useEffect(() =>{
    // Add a request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })

    // Add a response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use((response) => response, async(error) => {
        if(error.response  && (error.response.status === 401 || error.response.status === 403)) {
            await logout;
            // if error come here
            navigate('/login');
            throw error;
        }

        throw error; 
    })

    return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
        axiosSecure.interceptors.request.eject(responseInterceptor)
    }

  }, [logout, navigate, axiosSecure])

  return axiosSecure
}

export default useAxiosSecure