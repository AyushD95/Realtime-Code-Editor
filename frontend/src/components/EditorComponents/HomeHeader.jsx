import React from "react";


const HomeHeader = ({returnHome}) => {

 
  return (
    
      <div className="sticky z-50 bg-gray-300 lg:pr-8 pt-2 pb-1 lg:justify-start">
        <h1 className="text-4xl lg:text-7xl lg:text-left text-homeText text-center font-irish-grover   lg:mt-0 lg:ml-4" 
        onClick={returnHome}>
          CodeLink
        </h1>
      </div>
    
  );
};

export default HomeHeader;
