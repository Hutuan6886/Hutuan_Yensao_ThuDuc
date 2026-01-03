import React from "react";

interface TitleWrapperProps {
  title: string;
  children: React.ReactNode;
}
const TitleWrapper: React.FC<TitleWrapperProps> = ({ title, children }) => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center gap-5 md:gap-10 py-10 md:py-20">
      <h1 className="text-[#613613] font-semibold text-2xl! md:text-3xl! lg:text-4xl!">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default TitleWrapper;
