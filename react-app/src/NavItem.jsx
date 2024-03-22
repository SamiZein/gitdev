import { NavLink } from "react-router-dom"

export default function NavItem({ icon: Icon, text,route}) {
    const activeStyle = {
        borderBottom: '2px solid #f56a00',
    };
    return(
        <li>
            <NavLink 
                to={route} 
                className={({ isActive }) =>
                    `flex flex-row items-center ${
                        isActive ? 'border-b-2 border-orange-500' : ''
                    }`
        }
            >
                {Icon && <Icon className="mr-2 text-gray-300 place-self-center" />}
                {text}
            </NavLink>
        </li>
    );
}