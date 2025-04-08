import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Boxes, Package, ShoppingCart } from 'lucide-react';

const BottomHeader = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/all-subcategories', icon: Boxes, label: 'Subcategories' },
    { path: '/all-products', icon: Package, label: 'Products' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive(path)
                ? 'text-primary-600'
                : 'text-gray-500 hover:text-primary-600'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomHeader; 