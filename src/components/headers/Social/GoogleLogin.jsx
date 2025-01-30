import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const GoogleLogin = () => {
    const {googleLogin} = useAuth()
    const navigate = useNavigate()
    const handleLogin = () =>{
        // console.log('googleLogin')
        googleLogin().then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            if(user){
                const userImp = {
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    role: 'user',
                    gender: "Is not specified",
                    address: "is not specified",
                    phone: "is not specified",
                };
                
                if(user.email && user.displayName){
                    return axios.post('hps://yoga-master-server-slrk.onrender.com/new-user', userImp).then(() =>{
                        navigate('/');
                        return "Registration Sucessfull"
                    }).catch((err) =>{
                        throw new Error(err);
                    })
                }
            }
            
        }).catch((error) => {
            // Handle Errors here.
            const errorCode  = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            console.log(errorMessage)
            
          });
    };
  return (
    <div className="flex items-center justify-center my-3">
        <button onClick={() =>{handleLogin()}} className="flex items-center px-6 py-4 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md outline-none hover:bg-gray-200 focus:outline-none">
        <FcGoogle className="w-6 h-6 mr-2" />
            <span>Continue with google</span>
        </button>
    </div>
  )
}

export default GoogleLogin