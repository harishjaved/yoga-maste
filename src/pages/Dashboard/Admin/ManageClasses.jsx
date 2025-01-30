import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Pagination } from '@mui/material';
import Swal from 'sweetalert2';

const ManageClasses = () => {
    const navigate = useNavigate();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const [classes, setClasses] = useState([]);
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const itemsPerPage = 5;
    const totalPage = Math.ceil(classes.length / itemsPerPage);
    
    const handleChange = (event, value) => {
        setPage(value)
    }
    
    useEffect(() => {
        axiosFetch.get('/classes-manage').then(res => setClasses(res.data)).catch(err => console.log(err))
    }, []);
    useEffect(() => {
        let lastIndex = page * itemsPerPage; 
        const firstIndex = lastIndex - itemsPerPage;
        if(lastIndex > classes.length){
            lastIndex = classes.length;
        }
        const currentData = classes.slice(firstIndex,lastIndex);
        setPaginatedData(currentData)
    },[page, totalPage]);
    
    const handleApprove = (id) => {
        axiosSecure.put(`/change-status/${id}`, {status: "approved"}).then(res => {
            console.log(res.data);
            alert("Course Approved Successfully")
            const updateClass = classes.map(cls => cls._id === id ? {...cls, status: 'approved'} : cls)
            
            setClasses(updateClass)
        }).catch(err => console.log(err))
    }
    
    const handleReject = async (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, unpublish it!"
        }).then(async (result) => { // Make this function async
          if (result.isConfirmed) {
            try {
              const res = await axiosSecure.put(`/change-status/${id}`, { status: 'rejected', reason: 'rejected' });
              
              // Only proceed if the response data indicates success
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  title: "Unpublished!",
                  text: "Your course is unpublished.",
                  icon: "success"
                });
      
                // Update the local state
                const updateClass = classes.map(cls => 
                  cls._id === id ? { ...cls, status: 'rejected' } : cls
                );
                setClasses(updateClass);
              }
            } catch (error) {
              console.error('Error updating course status:', error);
            }
          }
        });
      };
      

  return (
    <div>
        <h1 className='my-10 text-4xl font-bold text-center text-secondary'>Manage <span className='text-black'>Classes</span></h1>
        
        
        <div className="">
  <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full text-sm font-light text-left">
            <thead className="font-medium border-b dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">PHOTO</th>
                <th scope="col" className="px-6 py-4">COURSE NAME</th>
                <th scope="col" className="px-6 py-4">INSTRUCTOR NAME</th>
                <th scope="col" className="px-6 py-4">STATUS</th>
                <th scope="col" className="px-6 py-4">DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {
                classes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-2xl font-bold text-center">No Classes Found</td>
                  </tr>
                ) : (
                  paginatedData.map((cls) => (
                    <tr
                      key={cls._id}
                      className="transition duration-300 ease-in-out border-b hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={cls.image} className="h-[35px] w-[35px]" alt="Course" />
                      </td>
                      <td className="px-6 py-4 whitespace-pre-wrap">{cls.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{cls.instructorName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-bold ${cls.status === 'pending' ? 'bg-orange-400' : cls.status === 'checking' ? 'bg-yellow-500' : cls.status === 'approved' ? 'bg-green-600' : 'bg-red-600'} px-2 py-1 uppercase text-white rounded-xl`}>
                          {cls.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {
                            <button
                            onClick={() => handleApprove(cls._id)}
                            className="text-[12px] cursor-pointer bg-green-500 py-1 rounded-md px-2 text-white"
                            // disabled={cls.status !== 'pending'}
                          >
                            Approve
                          </button>
                          }
                          {
                            <button
                            onClick={() => handleReject(cls._id)}
                            className="px-2 py-1 text-white bg-red-600 rounded-md cursor-pointer"
                            disabled={cls.status === 'rejected' || cls.status === 'checking'}
                          >
                            Deny
                          </button>
                          }
                          {
                            <button
                            onClick={() => handleReject(cls._id)}
                            className="px-2 py-1 text-white bg-red-600 rounded-md cursor-pointer"
                            disabled={cls.status === 'rejected' || cls.status === 'checking'}
                          >
                            Feedback
                          </button>
                          }
                        </div>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
  
  {/* pagination */}
  
  <div>
    <div className='flex items-center justify-center w-full h-full my-10'>
    <Pagination onChange={handleChange} count={totalPage} color="primary" />
    </div>
  </div>
  
  {/* <ThemeProvider theme={theme}>
    <div className="flex items-center justify-center w-full h-full my-10">
      <Pagination onChange={handleChange} count={totalPage} color="primary" />
    </div>
  </ThemeProvider> */}
</div>   
        
    </div>
  )
}

export default ManageClasses