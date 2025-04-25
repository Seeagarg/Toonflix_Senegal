import React from 'react';

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <div className="w-full h-5/6 "><div></div>

      <div className="bg-black  border-t border-solid border-black text-white text-center relative w-full  ">
        <p className="font-bold py-4 ">
         
          <span className="text-orange-600">
          
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
