import React from 'react';
import { services } from '../data/siteData';

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-16 sm:h-20 bg-primary rounded-br-[50%] rounded-bl-[50%] -translate-y-1/2"></div>
      
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col items-center mb-12">
          <span className="text-xs font-medium text-gray-500">See Collection</span>
          <h2 className="text-xl sm:text-2xl font-bold text-purple-900 mt-2 text-center">
            {services.title}
          </h2>
          <div className="h-1 w-16 bg-[#CE44E4] mt-4"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {services.list.map((item, index) => (
            <div key={index} className="flex flex-col items-center mb-8 sm:mb-0">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                <img 
                  src={item.image} 
                  alt={`Service ${index + 1}`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-purple-600"></div>
              </div>
              <p className="text-center text-sm text-gray-700 mt-6 max-w-xs px-4">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <a 
            href={services.btn.href} 
            className="inline-block text-purple-900 border-b border-purple-900 pb-1 font-medium hover:text-[#CE44E4] hover:border-[#CE44E4] transition-colors duration-300"
          >
            {services.btn.txt}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
