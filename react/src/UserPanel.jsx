import Avatar from "./Avatar";
import AuthedBtn from "./AuthedBtn";
import GithubStats from "./GithubStats";
import { postData } from "./Utils";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import UserLinguistics from "./UserLinguistics";
import { GrLocation } from "react-icons/gr";
import SocialLinks from "./SocialLinks";

export default function UserPanel({panelUser}) {
    const {user} = useContext(AuthContext)
    

    const postCollab = async () => {
        try {
            await postData("/v1/collabs", {
                "github_id": panelUser.GithubID
            }, user.AccessToken);
        } catch (error) {
            console.error("Error posting collab:", error);
        }
    };
    
    return (
        panelUser &&
        <div className="h-full ml-4 min-w-80">
            <div className="flex mb-3">
                <Avatar src={panelUser.AvatarUrl} className="size-12" />
                <div className="ml-3">
                    <h1 className="-mb-2 text-xl">{panelUser.Username}</h1>
                    <h2 className="ml-2">{panelUser.Title}</h2>
                    {panelUser.Location && 
                    <div className="flex items-center text-sm">
                        <GrLocation />
                        <h3>{panelUser.Location}</h3>
                    </div>
                    }                   
                </div>
                <SocialLinks user={panelUser} />
            </div>
            <UserLinguistics className="mx-4" githubID={panelUser.GithubID} />
            <AuthedBtn onClick={() => postCollab()} text="Collab" />
            <p className="m-2 text-base/loose">
                {panelUser.Bio}
            </p>
            
            <GithubStats 
                className="justify-center my-5"
                user={panelUser} 
            />
        </div>
    );
}
