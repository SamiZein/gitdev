import { NavLink } from "react-router-dom"

export default function NavItem({ icon: Icon, text,route}) {
    return(
        <li>
            <NavLink to={route} 
                className="flex flex-row"
                activeClassName="border-b border-blue-500"
            >
                {Icon && <Icon className="mr-2 text-gray-300 place-self-center" />}
                {text}
            </NavLink>
        </li>
    );
}