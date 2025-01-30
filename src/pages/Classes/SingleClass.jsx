import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useUser from '../../hooks/useUser';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';


import { DialogActions } from "@mui/material";
import { BiTime } from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdBookOnline } from "react-icons/md";
import bannerImg1 from "../../assets/home/banner-1.jpg"

const SingleClass = () => {
    const course = useLoaderData();
    // console.log(course)
    const {currentUser} = useUser();
    // console.log(currentUser?.role)
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosFetch =useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    
    const handleSelect = (id) => {
        console.log(id,"item id")
        console.log(currentUser.email,"crnt user")
        console.log(enrolledClasses,"enrolled")
       axiosSecure.get(`/enrolled-classes/${currentUser?currentUser.email:''}`)
       .then((res) => {
         console.log(res); // Log the response
         setEnrolledClasses(res.data)})
       .catch(err => console.log(err))
       if(!currentUser){
         return alert("Please Login First")
       }
       
       axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
       .then(res => {
         if(res.data.classId == id){
           return alert("Already Selected"); 
         }else if(enrolledClasses.find(item => item.classes._id == id)) {
           return alert("Already Enrolled")
         } else{
             const data = {
               classId: id,
               userMail: currentUser.email,
               data: new Date()
             }
             axiosSecure.post('/add-to-cart',data)
             .then(res =>{
               alert("added to cart")
               console.log(res.data)
             })
             
         }
       })
      }
      // console.log(handleSelect)
  return (
    <>
      <div className="font-gilroy font-medium text-gray-700 dark:text-white text-lg leading-[27px] w-[90%] mx-auto">
  {/* breadcrumb or header */}
  <div className="py-20 mt-20 bg-blue-300 bg-center bg-no-repeat bg-cover breadcrumbs section-padding">
    <div className="container text-center">
      <h2>Course Details</h2>
    </div>
  </div>

  <div className="mt-8 nav-tab-wrapper tabs section-padding">
    <div className="container">
      <div className="grid grid-cols-12 md:gap-[30px]">
        {/* left side */}
        <div className="col-span-12 lg:col-span-8">
          <div className="single-course-details">
            <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
              <img
                src={course?.image}
                alt="Course Thumbnail"
                className="block object-cover w-full h-full rounded-md"
              />
            </div>

            <h2 className="mb-2 text-2xl">{course?.name}</h2>

            <div className="flex items-center mt-6 space-x-5 space-y-5 author-meta sm:lg:space-x-16 sm:space-y-0">
              <div className="flex items-center space-x-4 group">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&
                            ixid=M3wxMjA3FDB8MHxwaG90by1wYWd1fHx8fGVufDB8fHx8fAx3D%3D"
                      alt="Instructor"
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-secondary">
                    Trainer:{" "}
                    <a href="#" className="text-black">
                      {course?.instructorName}
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <span className="text-secondary">
                  Last Update:
                  <a href="#" className="ml-1 text-black">
                    {new Date(course?.submitted).toLocaleDateString()}
                  </a>
                </span>
              </div>
            </div>

            {/* Tab navigation */}
            <div className="mt-12 nav-tab-wrapper">
              <ul id="tabs-nav" className="mb-8 course-tab">
                <li className="active">
                  <a href="#tab1">Overview</a>
                </li>
                <li>
                  <a href="#tab2">Curriculum</a>
                </li>
                <li>
                  <a href="#tab3">Instructor</a>
                </li>
                <li>
                  <a href="#tab4">Reviews</a>
                </li>
              </ul>

              {/* Tab content */}
              <div id="tabs-content">
                <div id="tab1" className="tab-content">
                  <h3 className="mt-8 text-2xl">Course Description</h3>
                  <p className="mt-4">
                    This tutorial will help you learn quickly and thoroughly.
                    Lorem ipsum, or lipsum as it sometimes known, is dummy text used in laying out print, graphic or web designs.
                    <br /> <br />
                    You'll be exposed to principles and strategies, and more importantly, you'll learn how to apply these abstract concepts by coding different websites for various audiences.
                  </p>

                  <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                    <h4 className="text-2xl">What You Will Learn?</h4>
                    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <li className="flex space-x-3">
                        <div className="flex-none top-1">
                          <img src="/correct-mark.png" alt="Check Mark" />
                        </div>
                        <div className="flex-1">
                          Learn how perspective works and how to incorporate your art.
                        </div>
                      </li>
                      <li className="flex space-x-3">
                        <div className="flex-none top-1">
                          <img src="/correct-mark.png" alt="Check Mark" />
                        </div>
                        <div className="flex-1">
                          Learn how perspective works and how to incorporate your art.
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-2xl">Requirements</h4>
                    <div className="grid grid-cols-1 gap-5 mt-5 lg:grid-cols-3 sm:grid-cols-2">
                      <div className="flex items-center px-5 py-4 space-x-3 bg-white rounded shadow-box2">
                        <img src="/logo.png" alt="Requirement 1" />
                        <span className="flex-1 text-black">Computer/Mobile</span>
                      </div>
                      <div className="flex items-center px-5 py-4 space-x-3 bg-white rounded shadow-box2">
                        <img src="/logo.png" alt="Requirement 2" />
                        <span className="flex-1 text-black">Paper & Pencil</span>
                      </div>
                      <div className="flex items-center px-5 py-4 space-x-3 bg-white rounded shadow-box2">
                        <img src="/logo.png" alt="Requirement 3" />
                        <span className="flex-1 text-black">Internet Connection</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="tab2" className="tab-content">
                  <h3 className="mt-8 text-2xl">Lesson Plan</h3>
                  <p className="mt-4">
                    This tutorial will help you learn quickly and thoroughly. Lorem ipsum, or lipsum as it sometimes known, is dummy text used in laying out print, graphic or web designs.
                    You'll be exposed to principles and strategies, and you'll learn how to apply these concepts.
                  </p>

                  <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                    <h4 className="text-2xl">This Course is for Beginners</h4>
                  </div>

                  <div>
                    <h4 className="text-2xl">What You Will Learn?</h4>
                    <p className="mt-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe repellendus voluptate eos molestiae fuga odit ipsam nemo tenetur quod eaque error voluptatibus sapiente quis quaerat veniam, reprehenderit dolorum nisi in.
                    </p>
                  </div>
                </div>
                {/* Additional tabs can be filled here */}
              </div>
            </div>
          </div>
        </div>

        {/* Right side content can be added here */}
        <div className="col-span-12 mt-8 lg:col-span-4 md:mt-0">
  <div className="sidebarWrapper space-y-[30px]">
    <div className="space-y-5 widget custom-text">
      <a className="h-[220px] rounded relative block" href="#">
        <img
          src={course.image}
          alt=""
          className="block object-cover w-full h-full rounded"
        />
        <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <img src="/play.png" alt="Play" />
        </div>
      </a>
      <h3>${course.price}</h3>
      <button
        onClick={() => handleSelect(course._id)}
        title={
          role === "admin" || role === "instructor"
            ? "Instructor/Admin cannot select"
            : course.availableSeats < 1
            ? "No seats available"
            : "You can select this class"
        }
        disabled={role === "admin" || role === "instructor" || course.availableSeats < 1}
        className="w-full px-6 py-2 text-center text-white btn btn-primary bg-secondary"
      >
        Enroll Now
      </button>
      <ul className="list">
        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
          <div className="flex items-center flex-1 space-x-3">
            <FaUser className="inline-flex" />
            <div className="font-semibold text-black">Instructor</div>
          </div>
          <div className="flex-none">{course.instructorName}</div>
        </li>

        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
          <div className="flex items-center flex-1 space-x-3">
            <MdBookOnline />
            <div className="font-semibold text-black">Lectures</div>
          </div>
          <div className="flex-none">23</div>
        </li>

        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
          <div className="flex items-center flex-1 space-x-3">
            <BiTime />
            <div className="font-semibold text-black">Duration</div>
          </div>
          <div className="flex-none">2Hr 36Minutes</div>
        </li>

        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
          <div className="flex items-center flex-1 space-x-3">
            <FaUsers />
            <div className="font-semibold text-black">Enrolled</div>
          </div>
          <div className="flex-none">{course?.totalEnrolled}</div>
        </li>

        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
          <div className="flex items-center flex-1 space-x-3">
            <FaLevelUpAlt />
            <div className="font-semibold text-black">Course Level</div>
          </div>
          <div className="flex-none">Intermediate</div>
        </li>

        <li className="flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 last:mb-0 last:border-0">
          <div className="flex items-center flex-1 space-x-3">
            <FaLanguage />
            <div className="font-semibold text-black">Language</div>
          </div>
          <div className="flex-none">English</div>
        </li>
      </ul>
      
      <ul className="flex items-center pt-3 space-x-4">
        <li className="font-semibold text-black">Share On:</li>
        <li>
          <a href="#" className="flex w-10 h-10">
            <img src="/logo.png" alt="Share" />
          </a>
        </li>
        <li>
          <a href="#" className="flex w-10 h-10">
            <img src="/logo.png" alt="Share" />
          </a>
        </li>
        <li>
          <a href="#" className="flex w-10 h-10">
            <img src="/logo.png" alt="Share" />
          </a>
        </li>
        <li>
          <a href="#" className="flex w-10 h-10">
            <img src="/logo.png" alt="Share" />
          </a>
        </li>
      </ul>
    </div>

    <div className="widget">
      <h4 className="widget-title">Related Courses</h4>
      <ul className="list">
        <li className="flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
          <div className="flex-none">
            <div className="w-20 h-20 rounded">
              <img
                src={bannerImg1}
                alt=""
                className="object-cover w-full h-full rounded"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex mb-2 space-x-3">
              <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
              <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
              <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
              <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
              <iconify-icon icon="heroicons:star-20-solid" className="text-tertiary"></iconify-icon>
            </div>
            <div className="mb-1 font-semibold text-black">Greatest Passion In...</div>
            <span className="font-semibold text-secondary">$38.00</span>
          </div>
        </li>

        <li className="flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
          <div className="flex-none">
            <div className="w-20 h-20 rounded">
              <img
                src={bannerImg1}
                alt=""
                className="object-cover w-full h-full rounded"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-1 font-semibold text-black">Greatest Passion In...</div>
            <span className="font-semibold text-secondary">$38.00</span>
          </div>
        </li>

        <li className="flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
          <div className="flex-none">
            <div className="w-20 h-20 rounded">
              <img
                src={bannerImg1}
                alt=""
                className="object-cover w-full h-full rounded"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-1 font-semibold text-black">Greatest Passion In...</div>
            <span className="font-semibold text-secondary">$38.00</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>

        
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default SingleClass