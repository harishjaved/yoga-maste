import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUser from '../../../../hooks/useUser';
import { Link } from 'react-router-dom';


const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const axiosSecure = useAxiosSecure()
  const {currentUser} = useUser();

  useEffect(() => {
   axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
   .then(res => {
    setData(res.data);

   }).catch(err => console.log(err));

  }, [])





  return (
    <div>
      <h1 className='my-6 text-2xl'>Enrolled Classes</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 '>
        {
          data.map((item, index) => (
            <div key={index} className='flex justify-around mx-3 overflow-hidden bg-white shadow-md md:flex-row tems-center f rounded-3xl h-96 sm:flex-grow sm:h-52 sm:w-3/5'>
              <img src={item.classes.image} alt="" className='object-cover w-full h-1/2 sm:h-full sm:w-1/2'/>
              <div className='flex flex-col items-baseline justify-around flex-1 w-full pl-6 h-1/2 sm:h-full sm:items-baseline sm:w-1/2'>
              <div>
                <h1>{item.classes.name}</h1>
                <p>{item.classes.instructorName}</p>
              </div>
                 <div className='flex gap-5'>
                  <p className='font-bold text-gray-500'>${item.classes.price}</p>
                  <Link to={`/dashboard/course-details`}><button className='px-3 py-1 mr-5 font-bold text-white shadow-md rounded-xl bg-secondary'>
                    View
                  </button></Link>
                  
                  </div>
              </div>
              
              
            </div>
            
            
          ))
        }
      </div>
    </div>
  )
}

export default EnrolledClasses