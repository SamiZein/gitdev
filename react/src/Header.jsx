import { TbTrident } from "react-icons/tb";
import NavBar  from "./NavBar"
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import Avatar from "./Avatar";
import {handleLogin} from './Utils';
import AuthedBtn from "./AuthedBtn";
import Settings from "./Settings";

export default function Header() {
    const { isLoggedIn, user} = useContext(AuthContext);
    const [ isSettingsOpen, setIsSettingsOpen ] = useState(false);

    const toggleIsSettingsOpen = () => {
      setIsSettingsOpen(!isSettingsOpen);
    };

    return (
      <div className="bg-dark-bg">
        <div className="flex justify-between p-1">
          <div className="flex items-center ml-3 space-x-3 font-semibold">
            <TbTrident className="text-4xl" />
            {isLoggedIn && <h1>{user.Username}</h1>}
          </div>
          <div>
            {isLoggedIn 
            ? (<Avatar onClick={toggleIsSettingsOpen} src={user.AvatarUrl} className="size-8" />)
            : (<AuthedBtn onClick={handleLogin} text="Sign in" />)
            }
          </div>
        </div>
        {isSettingsOpen &&
          <Settings exitSettings={toggleIsSettingsOpen} />
        }
        <NavBar />
      </div>
    );
  }