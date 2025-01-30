import React from 'react';

const Footer = () => {
  return (
    <footer className="py-16 bg-gray-100">
      {/* Subscribe Section */}
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-2xl font-semibold">
          Want us to email you with the latest blockbuster news?
        </h2>
        <form className="flex items-center justify-center space-x-4">
          <input
            type="email"
            placeholder="example@company.com"
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-full focus:outline-none"
          />
          <button className="px-6 py-2 text-white bg-blue-600 rounded-full">
            Subscribe
          </button>
        </form>
      </div>

      {/* Footer Links */}
      <div className="container grid grid-cols-1 gap-10 mx-auto text-center md:grid-cols-4 md:text-left">
        <div className="flex flex-col items-center p-12 md:items-start">
          <p className="text-gray-500 ">
            Our experienced instructors will guide you through structured lessons, helping you develop a solid foundation while nurturing your creativity and musical expression.
          </p>
          <div className="flex mt-6 space-x-4">
            <a href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="GitHub" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" aria-label="Dribbble" className="text-blue-600 hover:text-blue-800">
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </div>

        {/* Services Section */}
        <div className="flex flex-col">
          <h4 className="mb-4 text-lg font-semibold">Services</h4>
          <a href="#" className="text-blue-600 hover:underline">Rock and Yoga</a>
          <a href="#" className="text-blue-600 hover:underline">Healthy Diet</a>
          <a href="#" className="text-blue-600 hover:underline">Fit to health</a>
          <a href="#" className="text-blue-600 hover:underline">Exercise</a>
        </div>

        {/* About Section */}
        <div className="flex flex-col">
          <h4 className="mb-4 text-lg font-semibold">About</h4>
          <a href="#" className="text-blue-600 hover:underline">About</a>
          <a href="#" className="text-blue-600 hover:underline">Careers</a>
          <a href="#" className="text-blue-600 hover:underline">History</a>
          <a href="#" className="text-blue-600 hover:underline">Our Team</a>
        </div>
        <div className="flex flex-col">
          <h4 className="mb-4 text-lg font-semibold">Support</h4>
          <a href="#" className="text-blue-600 hover:underline">FAQs</a>
          <a href="#" className="text-blue-600 hover:underline">Contact</a>
          <a href="#" className="text-blue-600 hover:underline">Live Chats</a>

        
      </div>
       </div>

      {/* Bottom Footer */}
      <div className="mt-10 text-center text-gray-500">
        <p>© Company 2022. All rights reserved.</p>
        <p>
          Created with <a href="#" className="text-blue-600 hover:underline">Yoga Master</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
