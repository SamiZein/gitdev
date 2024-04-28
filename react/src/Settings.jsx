import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function Settings({exitSettings}) {
  const { logout } = useContext(AuthContext);



  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-50 bg-dark-bg"
        onClick={exitSettings}
    >
        <div className="p-6 rounded-lg shadow-lg bg-dark-bg"
            onClick={(e)=>{e.stopPropagation()}}
        >
            <button onClick={()=>{
                logout();
                exitSettings();
                }} 
                className="px-4 py-2 font-bold rounded text-dark-alert-text bg-dark-alert hover:bg-dark-error hover:text-dark-error-text"
            >
                Sign out
            </button>
        </div>  
    </div>

  );
}
