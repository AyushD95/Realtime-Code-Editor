import React from "react";
import Avatar from "react-avatar";
import nameInitials from "name-initials";

const Connected = ({users}) => {

  
  const getFirstName = (fullName) => fullName.split(" ")[0];

  return (
    <>
    <div className="flex flex-col items-center justify-center mt-4">
      <h1 className="text-homeText text-center lg:text-xl font-mono text-[16px] pb-2">
        Connected Users
      </h1>

      <div
        className={`bg-textArea rounded-2xl p-3 mx-auto  ${
          users.length === 1
            ? "lg:w-[15vw] lg:h-[8vw] w-[20vh] h-[15vh] flex items-center justify-center"
            : users.length === 2
            ? "lg:w-[16vw] lg:h-[9vw]  w-[25vh] h-[15vh] flex items-center justify-center"
            : users.length === 3
            ? "lg:w-[17vw] lg:h-[10vw] w-[30vh] h-[16vh] flex items-center justify-center"
            : users.length === 4
            ? "lg:w-[304px] lg:h-[125px]  flex items-center justify-center"
            : "w-auto h-auto"
        }`}
      >
        <div
          className={`grid ${
            users.length === 1
              ? "grid-cols-1 "
              : users.length === 2
              ? "grid-cols-2"
              : users.length <= 3
              ? "grid-cols-3"
              : "grid-cols-4"
          } gap-5`}
        >
          {users.map((user, index) => (
            <div className="flex flex-col relative" key={index}>
              <Avatar
                name={user.userName}
                maxInitials={2}
                size={55}
                round={true}
              />

              <p className=" text-homeText text-xs text-center ">
                {getFirstName(user.userName).substr(0, 4)}
                {nameInitials(user.userName)[1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-0">

      <div>

      </div>
      
      
    </div>
    </>
  );
};

export default Connected;
