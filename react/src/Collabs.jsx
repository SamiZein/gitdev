import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getData } from "./Utils";
import CollabCard from "./CollabCard";
import Login from "./Login";
import { TbPlugConnected } from "react-icons/tb";

export default function Collabs() {
    const {user, isLoggedIn} = useContext(AuthContext)
    const [collabs, setCollabs] = useState()



    useEffect(() => {
        if (isLoggedIn){
            try{
                getData("/v1/collabs",user?.AccessToken).then((data) => {
                    setCollabs(data)
                }); 
            } catch(error) {
                console.error("Error fetching collabs:", error);
                throw error;
            }
        }
    },[]);
    return (
        <div>
            <div id="collabs-header" className="pt-2 pl-2">
                <div className="flex text-4xl font-semibold">
                    <TbPlugConnected className="place-self-center" />
                    <h1>Collabs</h1>
                </div>
            </div>
            {
                isLoggedIn ?
                <div>
                    {collabs?.length
                    ?   collabs.map((collab, index) => 
                        <CollabCard key={index} collab={collab} />
                        )
                    :   "No collabs"
                    }
                </div>
                : <Login className="mt-2 ml-4" />
            }
        </div>
    );
}