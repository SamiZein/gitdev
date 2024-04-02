import Avatar from "./Avatar";
import Button from "./Button";
import RepoCount from "./RepoCount";

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

                    <Button onClick={() => postCollab()} text="Collab" />
                </div>
            </div>
            <div>{user.PanelBody.String}</div>
            <RepoCount count={user.Repos} />
        </div>
    );
}
