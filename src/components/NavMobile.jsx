import React from "react";
import { HashLink as Link } from "react-router-hash-link";

const NavMobile = ({ click }) => {
  return (
    <div className="w-full h-full bg-white/90 shadow-2xl transition-all duration-300 z-10">
      <ul className="h-full flex flex-col items-center justify-center gap-y-8">
        <li className="hover:text-accent transition duration-300">
          <Link to={"/#home"} onClick={click}>
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavMobile;
