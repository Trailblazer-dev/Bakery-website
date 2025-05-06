import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-12 md:pt-16 pb-8 border-t border-gray-100">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#" className="text-[#CE44E4] font-secondary text-2xl font-medium block mb-4">
              Bakery
            </a>
            <p className="text-sm text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-gray-100 p-3 rounded-full hover:bg-[#CE44E4] hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-gray-600 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="bg-gray-100 p-3 rounded-full hover:bg-[#CE44E4] hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-gray-600 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="bg-gray-100 p-3 rounded-full hover:bg-[#CE44E4] hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-gray-600 group-hover:text-white" />
              </a>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-0">
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Our Stores</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#CE44E4]">Slovakia</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#CE44E4]">Czech Republic</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#CE44E4]">Finland</a></li>
            </ul>
          </div>
          
          <div className="mt-2 sm:mt-8 md:mt-0">
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Useful Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#CE44E4]">Home</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#CE44E4]">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#CE44E4]">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-[#CE44E4]">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="mt-2 sm:mt-8 md:mt-0">
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Subscribe</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our newsletter to get updates about our products and offers.
            </p>
            <div className="flex flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 border border-gray-300 rounded-t-md sm:rounded-t-none sm:rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#CE44E4] focus:border-[#CE44E4] w-full"
              />
              <button className="bg-[#CE44E4] text-white px-4 py-2 rounded-b-md sm:rounded-b-none sm:rounded-r-md hover:bg-[#b83bcb] transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
