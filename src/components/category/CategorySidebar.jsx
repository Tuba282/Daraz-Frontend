import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiChevronRight } from 'react-icons/fi';

const CategorySidebar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get('/categories/tree');
        setCategories(data.tree || []);
      } catch (err) {
        console.error('Failed to load categories', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="skeleton h-6 w-2/3 mb-2"></div>
        <div className="skeleton h-4 w-1/2 mb-4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton h-5 w-full mb-2"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <h3 className="text-primary font-semibold px-4 py-3 border-b border-gray-200">Categories</h3>
      <ul className="text-sm">
        {categories.map((cat) => (
          <li key={cat._id} className="border-b border-gray-100 last:border-0">
            <Link
              to={`/category/${cat.slug}`}
              className="flex justify-between items-center px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <span>{cat.name}</span>
              <FiChevronRight className="text-gray-400" />
            </Link>
            {cat.subCategories && cat.subCategories.length > 0 && (
              <ul className="pl-6 bg-gray-50">
                {cat.subCategories.map((sub) => (
                  <li key={sub._id} className="border-b border-gray-200 last:border-0">
                    <Link
                      to={`/category/${sub.slug}`}
                      className="block px-4 py-2 hover:bg-white transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
