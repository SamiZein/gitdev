export default function UserPanel({user}) {
    return (
        user &&
        <div>{user.Username}</div>
        
    );
}