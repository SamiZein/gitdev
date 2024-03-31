import Button from "./Button";

export default function UserPanel({user}) {
    
    const postCollab = async () =>{
        console.log("post collab")
    };

    return (
        user &&
        <div>
            <div>{user.Username}</div>
            <Button onClick={() => postCollab()} text="Collab" />
        </div>
    );
}