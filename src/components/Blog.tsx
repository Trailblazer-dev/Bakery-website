import React from 'react';
import { blog } from '../data/siteData';

const Blog = () => {
  return (
    <section id="blog" className="py-12 md:py-16">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-center mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-900">
            OUR NEW ARTICLES
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blog.map((article, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg cursor-pointer">
              <div className="aspect-w-16 aspect-h-9 h-48 sm:h-52 md:h-64 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <div className="bg-[#CE44E4] text-white text-xs py-1 px-2 rounded absolute top-4 left-4">
                  <span>{article.date}</span>
                </div>
                <h3 className="font-medium text-base sm:text-lg leading-tight mb-2">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[1, 2, 3].map((dot) => (
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

export default Blog;
