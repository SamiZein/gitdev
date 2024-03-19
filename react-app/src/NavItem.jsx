import { NavLink } from "react-router-dom"

export default function NavItem({text,route}) {
    return(
        <li>
            <NavLink to={route}>
                <div className='nav-text'>{text}</div>
            </NavLink>
        </li>
    );
}