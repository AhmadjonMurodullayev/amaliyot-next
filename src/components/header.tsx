import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";

const Header = () => {
  return (
    <header className="flex w-full h-20 bg-gray-800 ">
      <div className="max-w-[1200px] m-auto w-full">
        <div className="flex items-center">
          <div>
            <Image src="/logo.png" alt="logo" width={150} height={100} />
          </div>
          <div>
            <Input />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
