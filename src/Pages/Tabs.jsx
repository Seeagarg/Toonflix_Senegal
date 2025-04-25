import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../slices/categorySlice';

const Tabs = ({ categories }) => {
  const storeSelectedCategory = useSelector((state) => state.category.selectedCategory);
  const dispatch = useDispatch();

  const handleTabChange = async (id) => {
    dispatch(setSelectedCategory(id));
  };

  return (
    <div className="w-full bg-gray-800 rounded-md flex flex-row gap-4 mt-3 justify-around items-center p-1">
      {categories.map((category, i) => (
        <div
          key={i}
          className={`cursor-pointer ${
            storeSelectedCategory === category.sub_cat_id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          } px-4 py-2 rounded-md whitespace-nowrap overflow-hidden overflow-ellipsis`}
          onClick={() => {
            handleTabChange(category.sub_cat_id);
          }}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Tabs;