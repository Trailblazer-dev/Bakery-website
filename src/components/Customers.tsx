import React from 'react';
import { customer } from '../data/siteData';

const Customers = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-center mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-900">
            {customer.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {customer.users.map((user, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left mb-6 sm:mb-0">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={user.image} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800">
                  {user.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                  {user.location}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  "{user.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[1, 2].map((dot) => (
              <div 
                key={dot} 
                className={`w-2 h-2 rounded-full ${dot === 1 ? 'bg-[#CE44E4]' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customers;
