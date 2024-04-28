
import NavItem from "./NavItem";
import { TbHammer } from "react-icons/tb";
import { TbPlugConnected } from "react-icons/tb";
import { RiSettings3Line } from "react-icons/ri";

export default function NavBar() {
    return(
        <div className="border-b border-gray-600">
            <nav className="font-bold">
                <ul className="flex ml-4 space-x-4">
                    <NavItem icon={TbHammer} text="Developers" route="/" />
                    <NavItem icon={TbPlugConnected} text="Collabs" route="/collabs" />
                    <NavItem icon={RiSettings3Line} text="Profile" route="/profile" />
                </ul>
            </nav>
        </div>
    );
};