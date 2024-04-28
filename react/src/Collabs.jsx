import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getData } from "./Utils";
import CollabCard from "./CollabCard";

export default function Collabs() {
    const {user, isLoggedIn} = useContext(AuthContext)
    const [collabs, setCollabs] = useState()


    useEffect(() => {
        if (isLoggedIn){
            getData("/v1/collabs",user?.AccessToken).then((data) => {
                setCollabs(data)
            }); 
        }
    },[]);
    return (
        user &&
        <>
            <div>Collabs</div>
            <div>
                {collabs?.length
                ?   collabs.map((collab) => 
                    <CollabCard collab={collab} />
                    )
                :   "No collabs"
                }
            </div>
        </>
    );
}