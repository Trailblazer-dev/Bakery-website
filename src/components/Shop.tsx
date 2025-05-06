import React from 'react';
import { shop } from '../data/siteData';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const { addItem } = useCart();

  return (
    <section id="shop" className="py-12 md:py-16">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-900">
            {shop.title}
          </h2>
          <a 
            href="/products" 
            className="text-sm text-[#CE44E4] hover:underline transition-all duration-300"
          >
            See All
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shop.collection.map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md relative group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart size={18} className="text-gray-400 hover:text-[#CE44E4] cursor-pointer" />
              </div>
              
              <div className="h-48 sm:h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-1 truncate">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.subtitle}
                </p>
                
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-bold text-purple-900">
                    {item.formattedPrice}
                  </span>
                  <button 
                    onClick={() => addItem(item)}
                    className="bg-[#CE44E4] hover:bg-[#b83bcb] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm transition-colors duration-300 flex items-center gap-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
