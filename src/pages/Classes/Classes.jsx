import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUser from '../../hooks/useUser';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Classes = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { currentUser } = useUser();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const role = currentUser?.role;

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  useEffect(() => {
    axiosFetch
      .get('/classes')
      .then((res) => setClasses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelect = (id) => {
    if (!currentUser) {
      toast.error('Please login first!');
      return;
    }

    axiosSecure
      .get(`/enrolled-classes/${currentUser.email}`)
      .then((res) => setEnrolledClasses(res.data))
      .catch((err) => console.log(err));

    axiosSecure
      .get(`/cart-item/${id}?email=${currentUser.email}`)
      .then((res) => {
        if (res.data.classId === id) {
          toast.warn('Already selected!');
        } else if (enrolledClasses.find((item) => item.classes._id === id)) {
          toast.warn('Already enrolled!');
        } else {
          const data = {
            classId: id,
            userMail: currentUser.email,
            date: new Date(),
          };
          axiosSecure
            .post('/add-to-cart', data)
            .then(() => {
              toast.success('Added to cart!');
            })
            .catch(() => {
              toast.error('Failed to add to cart!');
            });
        }
      })
      .catch(() => {
        toast.error('Error fetching cart information!');
      });
  };

  return (
    <div>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="pt-3 mt-20">
        <h1 className="text-4xl font-bold text-center text-secondary">Classes</h1>
      </div>

      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {classes.map((cls, index) => (
          <div
            key={index}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
            className={`relative hover:translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 mx-auto ${
              cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'
            } dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
          >
            {/* Image Section */}
            <div className="relative h-48">
              <div
                className={`absolute inset-0 transition-opacity duration-300 bg-black opacity-0 ${
                  hoveredCard === index ? 'opacity-60' : ''
                }`}
              />
              <img src={cls.image} alt="" className="object-cover w-full h-full" />

              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handleSelect(cls._id)}
                    title={
                      role === 'admin' || role === 'instructor'
                        ? 'Instructor/Admin cannot select'
                        : cls.availableSeats < 1
                        ? 'No seats available'
                        : 'You can select this class'
                    }
                    disabled={
                      role === 'admin' || role === 'instructor' || cls.availableSeats < 1
                    }
                    className="px-4 py-2 text-white duration-300 rounded disabled:bg-red-300 bg-secondary hover:bg-red-700"
                  >
                    Add To Cart
                  </button>
                </div>
              </Transition>
            </div>

            {/* Details Section */}
            <div className="px-6 py-2">
              <h3 className="mb-1 font-semibold">{cls.name}</h3>
              <p className="text-xs text-gray-500">Instructor: {cls.instructorName}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-600">
                  Available Seats: {cls.availableSeats}
                </span>
                <span className="font-semibold text-green-500">${cls.price}</span>
              </div>
              <Link to={`/class/${cls._id}`}>
                <button className="w-full px-4 py-2 mx-auto my-4 mt-4 mb-2 text-white duration-300 rounded disabled:bg-red-300 bg-secondary hover:bg-red-700">
                  View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
