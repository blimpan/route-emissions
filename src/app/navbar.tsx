"use client"

import NavSidebar from "./navSidebar";
import Image from "next/image";
import { useState } from "react";

const hamburgerIcon = "/images/icons8-hamburger.png";
const crossIcon = "/images/icons8-cross.png";

export default function NavBar(props:any) {

    const [isMenuOpen, setMenuOpen] = useState(false);

    function onBurgerClick(params:any) {
        setMenuOpen(!isMenuOpen);
    }
    
    return (
        <div className="debug flex w-full flex-row justify-between items-center h-[50px]">
            <div className="debug flex">
                <h1 className="text-xl text-british-green">
                    eco routes</h1>
            </div>
            <div className="debug flex">
                <button
                className="debug w-[40px] h-[40px]"
                onClick={onBurgerClick}
                >
                    <img
                    src={isMenuOpen ? crossIcon : hamburgerIcon}
                    alt="Hamburger menu"
                    className="w-auto h-auto"
                    
                    />
                </button>
            </div>
            {isMenuOpen && (
                <NavSidebar/>
            )}
        </div>
    );
};
