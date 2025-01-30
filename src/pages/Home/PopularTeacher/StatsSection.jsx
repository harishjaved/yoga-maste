import React from 'react';

const StatsSection = () => {
  return (
    <div className="w-full py-20 text-white bg-blue-800">
      <div className="container grid grid-cols-1 gap-8 mx-auto text-center md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-4xl font-bold">35M+</h3>
          <p className="mt-2 text-lg">Visitor</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">5M+</h3>
          <p className="mt-2 text-lg">Subscriber</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">950k+</h3>
          <p className="mt-2 text-lg">Students</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold">90%</h3>
          <p className="mt-2 text-lg">Success stories</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
