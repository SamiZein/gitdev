import Avatar from "./Avatar";
import AuthedBtn from "./AuthedBtn";
import GithubStats from "./GithubStats";

export default function UserPanel({user}) {
    

    const postCollab = async () =>{
        console.log(user)
    };
    return (
        user &&
        <div>
            <div className="flex">
                <Avatar src={user.Profile.AvatarUrl} size="50px" />
                <div>
                    <h1 className="text-xl">{user.Username}</h1>
                    <h2>{user.Role}</h2>
                </div>
            </div>
            <AuthedBtn onClick={() => postCollab()} text="Collab" />
            <div>{user.Profile.PanelBody.Valid
                ?user.Profile.PanelBody.String
                :"Empty"
                }</div>
            <GithubStats user={user} />
        </div>
    );
}
