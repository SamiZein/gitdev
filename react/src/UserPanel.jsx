import Avatar from "./Avatar";
import AuthedBtn from "./AuthedBtn";
import GithubStats from "./GithubStats";
import { postData } from "./Utils";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import UserLinguistics from "./UserLinguistics";

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
        <div className="flex flex-col items-start ml-3 min-w-80">
            <div className="flex mb-3">
                <Avatar src={panelUser.AvatarUrl} size="50px" />
                <div className="ml-3">
                    <h1 className="-mb-2 text-xl">{panelUser.Username}</h1>
                    <h2 className="ml-2">{panelUser.Title}</h2>
                </div>
            </div>
            <UserLinguistics className="mx-4" githubID={panelUser.GithubID} />
            <AuthedBtn onClick={() => postCollab()} text="Collab" />
            <p className="m-2 text-base/loose">
                {panelUser.Bio}
            </p>
            <GithubStats 
                className="mt-auto"
                user={panelUser} 
            />
        </div>
    );
}
