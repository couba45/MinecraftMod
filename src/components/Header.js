import { Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import React from "react";
import { MenuAlt1Icon, XIcon } from "@heroicons/react/solid";

import Modal from "../components/Modal.js";

function Header(props) {
  let [nav, setNav] = useState(true);
  let handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="p-7 fixed z-20 w-screen bg-black">
      <div className="flex flex-row justify-between">
        <div className="text-4xl md:text-5xl">
          <div className="text-emerald-400 font-extrabold z-10 relative ">
            <a className="cursor-pointer" href="http://localhost:3000/">
              LOGO
            </a>
          </div>
        </div>
        <div
          className="md:hidden cursor-pointer hover:text-emerald-500 transition"
          onClick={handleNav}
        >
          {nav ? <MenuAlt1Icon className="h-10" /> : <XIcon className="h-10" />}
        </div>
        <div
          className={
            !nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 pt-24 pl-7 pr-5 ease-in-out duration-500 md:hidden bg-black"
              : "fixed -left-[100%] pt-24 h-full top-0 md:hidden ease-in-out duration-500"
          }
        >
          <ul className="">
            <li className="hover:text-emerald-400 transition font-bold cursor-pointer p-4 uppercase border-b border-gray-600">
              <a href="/home">Home</a>
            </li>
            <li className="hover:text-emerald-400 transition font-bold cursor-pointer p-4 uppercase border-b border-gray-600">
              <a href="/about">About</a>
            </li>
            <li className="hover:text-emerald-400 transition font-bold cursor-pointer p-4 uppercase border-b border-gray-600">
              <a href="/comments">Comments</a>
            </li>
            <li className=" p-4">
              <Modal />
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <ul className="flex flex-col md:flex-row gap-6 items-center h-[100%]">
            <li className="hover:text-emerald-400 transition font-bold cursor-pointer">
              <a href="#home">Home</a>
            </li>
            <li className="hover:text-emerald-400 transition font-bold cursor-pointer">
              <a href="#about">About</a>
            </li>
            <li className="hover:text-emerald-400 transition font-bold cursor-pointer">
              <a href="#comments">Comments</a>
            </li>
            <li>
              <Modal />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
