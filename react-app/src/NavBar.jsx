
import NavItem from "./NavItem";
import { TbHammer } from "react-icons/tb";
import { TbPlugConnected } from "react-icons/tb";
import { GoGear } from "react-icons/go";

export default function NavBar() {
    return(
        <nav id="navbar"
            className="font-bold"
        >
            <ul className="flex flex-row px-4 py-3 space-x-4 bg-dark-bg text-dark-text">
                <NavItem icon={TbHammer} text="Developers" route="/" />
                <NavItem icon={TbPlugConnected} text="Collabs" route="/collabs" />
                <NavItem icon={GoGear} text="Settings" route="/settings" />
            </ul>
        </nav>
    );
};