import React from "react";

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-[80%] m-auto py-10">{children}</div>;
};

export default LayoutContainer;
