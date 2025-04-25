import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../slices/categorySlice';
import { Link } from 'react-router-dom';
import { changeLang } from '../Data/ChangeLanguage';

const Header = ({ categories }) => {
  const storeSelectedCategory = useSelector((state) => state.category.selectedCategory);
  const dispatch = useDispatch();

  const handleTabChange = async (id) => {
    dispatch(setSelectedCategory(id));
  };

  return (
    <div className="container mx-auto max-w-[1110px] h-full ">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Displaying select dropdown for small screens */}
        <div className="lg:hidden  flex  gap-4">
          <label htmlFor="categorySelect" className='text-xl font-bold'>Catégorie</label>
          <select
            id="categorySelect"
            className="w-full border rounded-md p-2"
            value={storeSelectedCategory}
            onChange={(e) => handleTabChange(e.target.value)}
          >
            <option value="All">All</option>
            {categories.categories.map((category, i) => (
              <option key={i} value={category.sub_cat_id}>
              {changeLang(category.name)}
                
              </option>
            ))}
          </select>
        </div>
        {/* Displaying individual category items for larger screens */}
        <div className="hidden lg:flex flex-wrap gap-6">
          <p
            className={`px-6 active md:active lg:active hover:bg-orange-600  hover:text-white rounded-xl font-bold shadow-lg shadow-zinc-700 text-black active:bg-bg-black p-2 ${
              storeSelectedCategory === 'All' ? 'bg-orange-600 text-white' : 'bg-white'
            }`}
            onClick={() => {
              handleTabChange('All');
            }}
          >
            Toute
          </p>
          {categories.categories.map((category, i) => (
            <div
              key={i}
              className={`px-6 active md:active lg:active hover:bg-orange-400 hover:text-white  rounded-xl font-bold shadow-lg shadow-zinc-700 text-black active:bg-bg-black p-2 gap-4 ${
                storeSelectedCategory === category.sub_cat_id ? 'bg-orange-600 text-white' : 'bg-white'
              }`}
              onClick={() => {
                handleTabChange(category.sub_cat_id);
              }}
            >
             
              <span className="ml-2 gap-4">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      <hr className="w-full h-px bg-gray-200 border-0 dark:bg-gray-200" />
    </div>
  );
};

export default Header;
