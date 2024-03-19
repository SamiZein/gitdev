import { NavLink } from "react-router-dom"
import NavItem from "./NavItem";

export default function NavBar() {
    return(
        <nav className="navbar">
            <ul class="navbar-nav flex flex-row">
                <NavItem text="Developers" route="/" />
                <NavItem text="Collabs" route="/collabs" />
                <NavItem text="Settings" route="/settings" />
            </ul>
        </nav>
    );
};