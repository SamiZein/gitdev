import Avatar from "./Avatar";

export default function CollabCard({collab}) {
    return(
        <div className="p-3 border-b border-gray-600">
            <div className="flex">
                <Avatar src={collab.AvatarUrl} size="20px" />
                <h1>{collab.Username}</h1>
            </div>
            
            <h2>{collab.Email}</h2>
        </div>
    );
};
