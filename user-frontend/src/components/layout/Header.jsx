import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '../../services/api';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cart = getCart();
        const totalItems = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartCount(totalItems);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };

    fetchCart();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/royal-logo.png"
              alt="Logo"
              className="h-16 w-auto"
              onError={(e) => {
                e.target.src = 'https://placehold.co/150x150';
              }}
            />
            <span className="text-xl font-bold text-gray-800">Royal Mobiles</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 