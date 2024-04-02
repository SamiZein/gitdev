import { NavLink } from "react-router-dom"

export default function NavItem({ icon: Icon, text, route}) {

    return(
        <li>
            <NavLink 
                to={route} 
                className={({ isActive }) =>
                    isActive
                    ? "flex pb-3 size-full border-b-2 border-orange-500"
                    : "flex pb-3 size-full"
                }
            >
                {Icon && <Icon className="mr-1 text-gray-300 place-self-center" />}
                {text}
            </NavLink>
        </li>
    );
}