import React from "react";
import Image from "next/image";
import { Logo } from ".";

interface LogoNavProps {
  data: Logo;
}
const logoNav = ({ data }: LogoNavProps) => {
  return <Image src={data.src} alt={data.alt} width={100} height={100} />;
};

export default logoNav;
