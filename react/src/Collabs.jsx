import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { getData } from "./Utils";

export default function Collabs() {
    const {user} = useContext(AuthContext)
    const [collabs, setCollabs] = useState()


    useEffect(() => {
        getData("/v1/collabs",user?.AccessToken).then((data) => {
            setCollabs(data)
        }); 
    },[]);
    return (
        user &&
        <>
            <div>Collabs</div>
            <div>
                {collabs?.length
                ?   collabs.map((collab) => 
                    <div>{collab.User1GithubID}</div>
                )
                : "No collabs"
                }
            </div>
        </>
    );
}