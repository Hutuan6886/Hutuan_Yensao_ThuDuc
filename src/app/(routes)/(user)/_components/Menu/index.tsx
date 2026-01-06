import React from "react";
import Commitment from "../../../../../components/user/Commitment";
import MenuTitle from "./MenuTitle";
import MenuList from "./MenuList";

const Menu = () => {
  return (
    <div className="flex flex-col items-center gap-6 md:relative w-full h-full bg-[#fff5e8] pt-5 pb-15 lg:pt-35 lg:pb-20">
      <div className="w-[90%] h-auto m-auto 
                      relative lg:absolute lg:-top-[60px] lg:left-1/2 lg:-translate-x-1/2">
        <Commitment />
      </div>
      <div className="w-[90%] lg:w-[70%] m-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
        <MenuTitle/>
        <MenuList/>
      </div>
    </div>
  );
};

export default Menu;
