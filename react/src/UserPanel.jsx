import Avatar from "./Avatar";
import AuthedBtn from "./AuthedBtn";
import GithubStats from "./GithubStats";

export default function UserPanel({user}) {

    const postCollab = async () =>{
        console.log("post collab")
    };
    return (
        user &&
        <div className="size-full">
            <div className="flex">
                <Avatar src={user.AvatarUrl} size="50px" />
                <div>
                    <h1 className="text-xl">{user.Username}</h1>

                    <AuthedBtn onClick={() => postCollab()} text="Collab" />
                </div>
            </div>
            <div>{user.PanelBody.Valid
                ?user.PanelBody.String
                :"Empty"
                }</div>
            <GithubStats user={user} />
        </div>
    );
}
