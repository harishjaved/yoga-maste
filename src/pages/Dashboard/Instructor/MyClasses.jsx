import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const MyClasses = () => {
    const [classes, setClasses] = useState([]);
    const {currentUser, isLoading} = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    
    useEffect(() => {
        axiosSecure.get(`/classes/${currentUser?.email}`).then(res => setClasses(res.data)).catch(err => console.log(err))
    }, [isLoading])
  return (
    <div>
        <div className='my-9'>
            <h1 className='text-4xl font-bold text-center'>My <span className='text-secondary'>Classes</span></h1>
            <div>
                <p className='text-[12px] text-center my-2'>Here you can see how many classes added by you and all classes status</p>
            </div>

        </div>
        
        <div>
           {
            classes.length === 0 ? <div className='mt-10 text-2xl font-bold text-center'>You have not added any classes yet</div> :
            <div>
  {classes.map((cls, index) => (
    <div
      key={index}
      className="mb-5 duration-200 rounded-lg hover:ring ring-secondary focus:ring"
    >
      <div className="p-4 bg-white rounded-lg shadow">
        
        {/* Main Heading */}
        <h2 className="text-[21px] font-bold text-secondary border-b pb-2 mb-4">
          {cls.name}
        </h2>

        <div className="grid grid-cols-3 gap-4"> {/* Grid with 3 columns */}

          {/* First Column: Info Section */}
          <div>
            <h1 className="mb-3 font-bold">Some info:</h1>
            <h1 className="my-2 text-secondary">
              <span className="text-black">Total Students</span> :{" "}
              {cls.totalEnrolled ? cls.totalEnrolled : 0}
            </h1>
            <h1 className="text-secondary">
              <span className="text-black">Total Seats</span> :{" "}
              {cls.availableSeats}
            </h1>
            <h1 className="my-2 text-secondary">
              <span className="text-black">Status</span> :{" "}
              <span
                className={`font-bold ${
                  cls.status === "pending"
                    ? "text-orange-400"
                    : cls.status === "checking"
                    ? "text-yellow-300"
                    : cls.status === "approved"
                    ? "text-green-500"
                    : "text-red-600"
                }`}
              >
                {cls.status}
              </span>
            </h1>
          </div>

          {/* Second Column: "......" and Price Info */}
          <div>
            <h1 className="mb-3 font-bold">......</h1>
            <h1 className="my-2 text-secondary">
              <span className="text-black">Price</span> : {cls.Price}{" "}
              <span className="text-black">$</span>
            </h1>
            <h1 className="my-2 text-secondary">
              <span className="text-black">Submitted</span> :{" "}
              <span>
                {cls.submitted
                  ? moment(cls.submitted).format("MMMM Do YYYY")
                  : "Not Get Data"}
              </span>
            </h1>
          </div>

          {/* Third Column: Action Buttons */}
          <div className="w-full">
            <h1 className="mb-3 font-bold">Action :</h1>
            <button
              onClick={() => handleFeedback(cls._id)}
              className="w-full px-3 py-1 font-bold text-white bg-orange-400 rounded-lg"
            >
              View Feedback
            </button>
            <button className="w-full px-3 py-1 my-3 font-bold text-white bg-green-500 rounded-lg">
              View Details
            </button>
            <button
              className="w-full px-3 py-1 font-bold text-white rounded-lg bg-secondary"
              onClick={() => navigate(`/dashboard/update/${cls._id}`)}
            >
              Update
            </button>
          </div>

        </div>
      </div>
    </div>
  ))}
</div>

  



           }
        </div>
    </div>
  )
}

export default MyClasses