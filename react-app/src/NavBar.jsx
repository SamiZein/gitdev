import { NavLink } from "react-router-dom"
import NavItem from "./NavItem";

export default function NavBar() {
    return(
        <nav id="navbar"
            className="font-bold"
        >
            <ul className="flex flex-row px-4 py-3 space-x-4 text-white bg-black">
                <NavItem text="Developers" route="/" />
                <NavItem text="Collabs" route="/collabs" />
                <NavItem text="Settings" route="/settings" />
            </ul>
        </nav>
    );
};