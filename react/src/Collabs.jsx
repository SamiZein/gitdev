import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getData } from "./Utils";
import CollabCard from "./CollabCard";

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
        user &&
        <>
            <div>Collabs</div>
            <div>
                {collabs?.length
                ?   collabs.map((collab, index) => 
                    <CollabCard key={index} collab={collab} />
                    )
                :   "No collabs"
                }
            </div>
        </>
    );
}