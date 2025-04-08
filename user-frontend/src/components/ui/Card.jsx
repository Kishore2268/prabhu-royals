import React from 'react';
import { ShoppingCart, Edit2, Trash2 } from 'lucide-react';

export const CategoryCard = ({ image, title, productCount, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{productCount} products</p>
      </div>
    </div>
  );
};

export const SubcategoryCard = ({ image, title, productCount, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{productCount} products</p>
      </div>
    </div>
  );
};

export const ProductCard = ({ image, title, description, price, onAddToCart, onEdit, onDelete, onQuantityChange, quantity }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 sm:h-72 md:h-80">
        <img
          src={image?.url || image || 'https://placehold.co/300x200?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://placehold.co/300x200?text=No+Image';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary-600">₹{price}</span>
          {onAddToCart && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-md p-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuantityChange && onQuantityChange(quantity - 1);
                  }}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md"
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity || 1}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuantityChange && onQuantityChange(quantity + 1);
                  }}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md"
                >
                  +
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          )}
          {(onEdit || onDelete) && (
            <div className="flex space-x-2">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-300"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="text-gray-600 hover:text-red-600 transition-colors duration-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Cards = {
  CategoryCard,
  SubcategoryCard,
  ProductCard
};

export default Cards; 