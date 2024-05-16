import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import {handleLogin} from "./Utils";

export default function AuthedBtn({ className, onClick, text}){
    const {isLoggedIn} = useContext(AuthContext);
    return (
        <button 
        onClick={isLoggedIn?onClick:handleLogin} 
        type="button"
        className={className + " px-3 py-2 rounded-lg bg-dark-button text-dark-button-text hover:bg-dark-button-hover"}
        >
            {text}
        </button>
    );
}