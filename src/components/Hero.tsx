import React from 'react';
import { hero } from '../data/siteData';

const Hero = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-center py-8 md:py-16 gap-8">
      <div className="max-w-md text-center md:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-4 leading-tight">
          {hero.title}
        </h1>
        <p className="text-gray-700 mb-8 text-sm md:text-base">
          {hero.subtitle}
        </p>
        <button className="bg-[#CE44E4] hover:bg-[#b83bcb] text-white font-medium py-2 md:py-3 px-6 md:px-8 rounded-full transition duration-300">
          {hero.btn}
        </button>
        
        <div className="flex items-center justify-center md:justify-start gap-4 mt-8">
          {hero.socials.map((social) => (
            <a 
              key={social.id} 
              href={social.href}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-2 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <social.icon size={18} className="text-purple-900" />
            </a>
          ))}
        </div>
      </div>
      
      <div className="relative mt-6 md:mt-0 w-full md:w-auto">
        <img 
          src={hero.image} 
          alt="Delicious bakery products" 
          className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto"
        />
      </div>
    </div>
  );
};

export default Hero;
