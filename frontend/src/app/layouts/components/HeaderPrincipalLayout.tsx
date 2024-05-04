"use client";
import React from "react";
import EditableImage from "../../components/EditableImage";
import LogoUpb from "@/public/MarcaDEUPB.png";
import NavBarOptions from "./NavBarOptions";
import Link from "next/link";

const HeaderPrincipalLayout = () => {
  return (
    <header className="w-full flex justify-between p-3">
      <Link href={"/"}>
        <EditableImage
          urlImg={LogoUpb}
          styles={"w-[208px] h-[68px]"}
          imageTitle={"Logo Upb"}
        />
      </Link>
      <NavBarOptions />
    </header>
  );
};

export default HeaderPrincipalLayout;
