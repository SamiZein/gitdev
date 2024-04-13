import { TbTrident } from "react-icons/tb";
import NavBar  from "./NavBar"
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Avatar from "./Avatar";
import {handleLogin} from './Utils';
import AuthedBtn from "./AuthedBtn";

export default function Header() {
    const { isLoggedIn, user} = useContext(AuthContext);
  
    return (
      <div className="bg-dark-bg">
        <div className="flex items-center justify-between p-1">
          <div className="flex items-center pl-2 space-x-1">
            <TbTrident className="text-4xl" />
            {isLoggedIn && <div>{user.Username}</div>}
          </div>
          <div>
            {isLoggedIn 
            ? (<Avatar src={user.AvatarUrl} size="30px" />)
            : (<AuthedBtn onClick={handleLogin} text="Sign in" />)
            }
          </div>
        </div>
        <NavBar />
      </div>
    );
  }