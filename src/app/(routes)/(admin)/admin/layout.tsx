import React from "react";
import LayoutContainer from "@/components/admin/Containers/LayoutContainer";
import Navbar from "@/components/admin/Navbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      <Navbar className="fixed top-0 left-1/2 -translate-x-1/2" />
      <div className="mt-[100px]">{children}</div>
    </LayoutContainer>
  );
}

export default DashboardLayout;
