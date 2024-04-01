import { FaGitkraken } from "react-icons/fa";
import NavBar  from "./NavBar"
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Avatar from "./Avatar";
import Button from "./Button";
import handleLogin from './Utils';

export default function Header() {
    const { isLoggedIn, user} = useContext(AuthContext);
  
    return (
      <div className="bg-dark-bg">
        <div className="flex items-center justify-between p-1">
          <div className="flex items-center space-x-4">
            <FaGitkraken className="text-5xl" />
            {isLoggedIn && <div>{user.Username}</div>}
          </div>
          <div>
            {isLoggedIn ? (
              <Avatar src={user.AvatarUrl} size="40px" />
            ) : (
              <Button onClick={handleLogin} text="Sign in" />
            )}
          </div>
        </div>
        <NavBar />
      </div>
    );
  }