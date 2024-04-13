import Avatar from "./Avatar";
import AuthedBtn from "./AuthedBtn";
import GithubStats from "./GithubStats";
import { postData } from "./Utils";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function UserPanel({panelUser}) {
    const {user} = useContext(AuthContext)
    

    const postCollab = () =>{
        postData("/v1/collabs",{
            "github_id":panelUser.GithubID
        },user.AccessToken)
    };
    return (
        panelUser &&
        <div>
            <div className="flex">
                <Avatar src={panelUser.AvatarUrl} size="50px" />
                <div>
                    <h1 className="text-xl">{panelUser.Username}</h1>
                    <h2>{panelUser.Role}</h2>
                </div>
            </div>
            <AuthedBtn onClick={() => postCollab()} text="Collab" />
            <div>
                {panelUser.PanelBody.Valid
                ?panelUser.PanelBody.String
                :""
                }
            </div>
            <GithubStats user={panelUser} />
        </div>
    );
}
