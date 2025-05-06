import React, { useState } from 'react'
import { navbar } from '../data/siteData';
import { Heart, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <div className="bg-[#FFFBFB] w-[90%] mx-auto flex rounded-bl-lg rounded-br-lg justify-between items-center px-4 sm:px-8 py-4 shadow-sm relative">
        <div className="py-2">
          <a
            href="#"
            rel="noopener noreferrer"
            className="text-[#CE44E4] font-secondary text-xl sm:text-2xl font-medium"
          >
            Bakery
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className='flex space-x-4 lg:space-x-8 items-center'>
            {navbar.map((item) => (
              <li key={item.id}>
                <a 
                  href={item.href} 
                  className="text-gray-700 hover:text-[#CE44E4] transition-colors duration-300 font-primary text-sm font-medium"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Auth/Cart */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-[#CE44E4] transition-colors duration-300 font-primary text-sm font-medium">
            Login/Register
          </a>
          <div className="flex items-center gap-3">
            <button className="relative" aria-label="Favorites">
              <Heart size={20} className="text-[#CE44E4]" />
            </button>
            <button 
              className="relative" 
              onClick={toggleCart}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} className="text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#CE44E4] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <div className="flex items-center gap-3">
            <button className="relative" aria-label="Favorites">
              <Heart size={18} className="text-[#CE44E4]" />
            </button>
            <button 
              className="relative" 
              onClick={toggleCart}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={18} className="text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#CE44E4] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
          <button 
            onClick={toggleMenu}
            className="text-gray-700 p-1"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-b-lg z-40 py-4 px-6 md:hidden">
            <ul className='flex flex-col space-y-4'>
              {navbar.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.href} 
                    className="text-gray-700 hover:text-[#CE44E4] transition-colors duration-300 font-primary text-sm font-medium block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-gray-100">
                <a 
                  href="#" 
                  className="text-gray-700 hover:text-[#CE44E4] transition-colors duration-300 font-primary text-sm font-medium block"
                >
                  Login/Register
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Header;