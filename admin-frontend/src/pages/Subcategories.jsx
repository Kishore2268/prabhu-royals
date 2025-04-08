import React, { useState, useEffect } from 'react';
import { getSubcategories, getCategory } from '../services/api';

const Subcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subcategoriesResponse, categoryResponse] = await Promise.all([
          getSubcategories(),
          getCategory(categoryId)
        ]);
        setSubcategories(subcategoriesResponse.data.data || []);
        setCategory(categoryResponse.data.data);
      } catch (err) {
        setError('Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subcategories</h1>
          {category && (
            <p className="text-gray-600 mt-1">Category: {category.name}</p>
          )}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Add Subcategory
        </button>
      </div>
      {/* ... rest of the existing code ... */}
    </div>
  );
};

export default Subcategories; 