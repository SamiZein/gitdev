import { NavLink } from "react-router-dom"

export default function NavItem({ icon: Icon, text,route}) {
    return(
        <li>
            <NavLink to={route}>
                {Icon && <Icon className="mr-2" />}
                {text}
            </NavLink>
        </li>
    );
}