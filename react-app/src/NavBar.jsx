import { NavLink } from "react-router-dom"

export default function NavBar() {
    return(
        <nav className="navbar">
            <ul class="navbar-nav flex flex-row">
                <li className="nav-item">
                    <NavLink to="/">
                        <div className='nav-text'>Home</div>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/profile" >
                        <div className='nav-text'>Profile</div>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/settings">
                        <div className='nav-text'>Settings</div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};