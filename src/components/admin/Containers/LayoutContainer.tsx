import React from "react";

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-[80%] m-auto">{children}</div>;
};

export default LayoutContainer;
