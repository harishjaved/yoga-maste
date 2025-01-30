import React, { useEffect, useState } from 'react'
import useUser from '../../../../hooks/useUser'
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import { FiBriefcase, FiMail, FiSend, FiUser } from 'react-icons/fi';

const AsInstructor = () => {
  const {currentUser} = useUser();
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true);

  const axiosFetch = useAxiosFetch();

  
  useEffect(() => {
    axiosFetch.get(`/applied-instructors/${currentUser?.email}`).then(
      res =>{
        console.log(data)
        setSubmittedData(res.data);
        setLoading(false)
      }
    ).catch((err) => console.error(err))
  }, []);
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    // Access the form values correctly
    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;
  
    // Create the data object
    const data = {
      name, 
      email, 
      experience
    };
  
    // Send the data with axios
    axiosFetch.post(`/as-instructor`, data)
      .then(res => {
        console.log(res.data);
        alert("Successfully applied");
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred while applying");
      });
  };
  
  return (
   <div className='my-20'>
    <div>
      {!submittedData?.name && (
        <div className='md:w-1/2'>
          <form onSubmit={onSubmit}>
            <div className='flex w-full'>
              <div className='w-full mb-4'>
                <label className='text-gray-700' htmlFor="name">Name</label>
                <div className='flex items-center mt-1'>
                  <FiUser className='text-gray-500'/>
                  <input type="text" name="name" id="name" defaultValue={currentUser?.name} disabled readOnly className='w-full ml-2 border-b border-gray-300 outline-none focus:border-secondary' />
                  
                </div>
              </div>
              <div className='w-full mb-4'>
                <label htmlFor="email" className='text-gray-700'>Email</label>
                <div className='flex items-center mt-1'>
                  <FiMail className='text-gray-500'/>
                  <input type="email" name="email" id="email" defaultValue={currentUser?.email} disabled readOnly className='w-full ml-2 border-b border-gray-300 outline-none focus:border-secondary' />
                </div>
              </div>
              
            </div>
            <div className='w-full mb-4'>
              <label htmlFor="experience" className='text-gray-700'>Experience</label>
              <div className='flex items-center mt-1'>
                <FiBriefcase className='text-gray-500'/>
                <textarea name="experience" id="experience" placeholder='Tell us about your experience....' className='w-full px-2 py-1 ml-2 border border-gray-300 rounded-lg outline-none resize-none placeholder:text-sm focus:border-secondary'>
                  
                </textarea>
              </div>
            </div>
            <div className='flex justify-center text-center'>
              <button type='submit' className='flex items-center px-4 py-2 text-white rounded-md bg-secondary focus:outline-none'>
                <FiSend className='mr-2'/>
                Submit
              </button>
              
            </div>
          </form>
          
        </div>
      )}
    </div>

   </div>
  )
}

export default AsInstructor