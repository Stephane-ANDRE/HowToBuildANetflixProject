
import { useCallback, useEffect, useState } from "react";

//import MobileMenu component
import MobileMenu from "./MobileMenu";
// import NavBarItem component
import NavBarItem from "./NavBarItem";

//import React icone
import { BsChevronCompactDown,BsSearch, BsBell} from "react-icons/bs";
import AccountMenu from "./AccountMenu";

// Constant for the top offset
const TOP_OFFSET = 66;

// NavBar component
const NavBar = () => {
     // State to manage the visibility of the mobile menu
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    // State to manage the visibility of the account menu
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const [showBackground, setShowBackground] = useState(false);

// Effect to update background visibility based on scroll position
    useEffect(() =>{
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, []);

    // Function to toggle the visibility of the mobile menu
    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, []);

      // Function to toggle the visibility of the account menu
      const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, []);

      // Render NavBar component
    return (
        // Navigation bar container
        <nav className="w-full fixed z-40">
            <div
            className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            ${showBackground ? "bg-zinc-900 bg-opacity-90":""}
            `}
            >
            <img className="h-4 lg:h-7" src="./images/logo.png" alt="logo" />
            <div className="
            flex-row
            ml-8
            gap-7
            hidden
            lg:flex
            "
            >
                <NavBarItem label="Home" />
                <NavBarItem label="Series" />
                <NavBarItem label="Films" />
                <NavBarItem label="New and Popular" />
                <NavBarItem label="My list" />
                <NavBarItem label="Browse by languages" />
            </div>

                {/* Mobile menu toggle button */}
            <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                <p className="text-white text-sm">Browse</p>
                <BsChevronCompactDown className={`text-white transition ${showMobileMenu ? "rotate-180": "rotate-0"} `} />

                {/*Mobile menu component */}
                <MobileMenu visible={showMobileMenu}/>               
            </div>

            <div className=" flex flex-row ml-auto gap-7 items-center">
                <div className="text-white hover:text-gray-400 cursor-pointer transition">
                    <BsSearch className="size-6" />
                </div>
                <div className="text-white hover:text-gray-400 cursor-pointer transition">
                    <BsBell className="size-6" />
                </div>

                {/*Account menu component */}
                <div onClick={toggleAccountMenu}  className="flex flex-row items-center gap-2 cursor-pointer relative">
                     <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                        <img src="/images/default-red.png" alt="profile" />
                    </div>
                    <BsChevronCompactDown className= {`text-white transition ${showAccountMenu ? "rotate-180": "rotate-0"} `} />
                    <AccountMenu visible ={showAccountMenu}/>
                </div>

            </div>
            </div>
        </nav>
    )
};

export default NavBar;