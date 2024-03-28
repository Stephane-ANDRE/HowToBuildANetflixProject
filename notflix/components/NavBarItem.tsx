import React from "react";

interface NavBarItemProps {
    label: string;
}

const NavBarItem: React.FC<NavBarItemProps> = ({
    label
}) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-400 transition">
            {/* here our labels are Home, Series, Films, etc that you can fint into the NavBar.tsx */}
            {label}
        </div>
    )
}

 export default NavBarItem