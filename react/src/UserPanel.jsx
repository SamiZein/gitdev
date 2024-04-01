import Avatar from "./Avatar";
import Button from "./Button";

export default function UserPanel({user}) {
    
    const postCollab = async () =>{
        console.log("post collab")
    };

    return (
        user &&
        <div>
            <h1>{user.Username}</h1>
            <Avatar src={user.AvatarUrl} size="50px" />
            <Button onClick={() => postCollab()} text="Collab" />
        </div>
    );
}