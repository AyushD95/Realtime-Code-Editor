import React from "react";


const HomeHeader = ({returnHome}) => {

 
  return (
    
    <div className="sticky z-50 bg-gray-300 pt-2 pb-1 lg:pr-8 lg:pl-8 md:pr-4 md:pl-4"> 
    <h1 
      className="text-4xl lg:text-7xl text-homeText 
               lg:text-left text-center font-irish-grover 
               lg:mt-0 
               lg:flex 
               lg:items-center 
               lg:justify-start 
               md:text-3xl 
               sm:text-2xl" 
      onClick={returnHome}
    >
      CodeLink
    </h1>
  </div>
  );
};

export default HomeHeader;
