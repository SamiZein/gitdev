
import NavItem from "./NavItem";
import { TbHammer } from "react-icons/tb";
import { TbPlugConnected } from "react-icons/tb";
import { GoGear } from "react-icons/go";

export default function NavBar() {
    return(
        <div>
            <nav className="font-bold">
                <ul className="flex flex-row px-4 py-1 space-x-4">
                    <NavItem icon={TbHammer} text="Developers" route="/" />
                    <NavItem icon={TbPlugConnected} text="Collabs" route="/collabs" />
                    <NavItem icon={GoGear} text="Settings" route="/settings" />
                </ul>
            </nav>
        </div>
    );
};