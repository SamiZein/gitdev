import { FaGitkraken } from "react-icons/fa";
import NavBar  from "./NavBar"
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Avatar from "./Avatar";
import Button from "./Button";
import handleLogin from './Utils';

export default function Header() {

    const { isLoggedIn, user, login, logout } = useContext(AuthContext);



    return (
        <div className="bg-dark-bg">
            <div className="flex flex-row">
                <FaGitkraken
                    className="p-2 text-5xl"
                /> 

                {isLoggedIn
                ?(<Avatar src={user.AvatarUrl} size="40px" />)
                :(<Button onClick={handleLogin} text="Sign in" />)
                }
                
            </div>
            <NavBar />

        </div>
    );
}