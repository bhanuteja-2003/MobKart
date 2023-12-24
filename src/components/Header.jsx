import React, { useContext, useEffect, useState, useRef } from "react";

// import components
import NavMobile from "./NavMobile";

import { HashLink as Link } from "react-router-hash-link";
import { BsBag } from "react-icons/bs";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [navMobile, setNavMobile] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  const { itemAmount } = useContext(CartContext);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  const btnRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!btnRef.current.contains(e.target)) {
        setNavMobile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all duration-300 select-none`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <button
          className="lg:hidden z-[15]"
          onClick={() => setNavMobile((prev) => !prev)}
        >
          {navMobile ? (
            <div className="text-3xl text-black">
              <IoCloseOutline />
            </div>
          ) : (
            <div className="text-3xl text-black">
              <IoMenuOutline />
            </div>
          )}
        </button>
        <div
          className={`${
            navMobile ? "left-0" : "-left-full"
          } fixed top-0 bottom-0 w-[60vw] md:w-[45vw] transition-all lg:hidden`}
          ref={btnRef}
        >
          <NavMobile click={() => setNavMobile(!navMobile)} />
        </div>
        <Link to={"/#home"}>
          <div className="flex items-center">
            <span className="font-logo font-bold text-xl lg:text-3xl text-accent">
              MobKart
            </span>
          </div>
        </Link>
        <div className="flex flex-row gap-x-4">
          <ul className="hidden lg:flex gap-x-4 text-black lg:text-lg">
            <li className="hover:text-accent transition duration-300">
              <Link to={"/#home"}>Home</Link>
            </li>
          </ul>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-2xl text-black" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] h-[18px] w-[18px] text-white rounded-full flex items-center justify-center">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
