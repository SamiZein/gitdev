import Avatar from "./Avatar";
import { GrLocation } from "react-icons/gr";

export default function CollabCard({collab}) {
    return(
        <div className="p-3 border-b border-gray-600">
            <div className="flex items-center space-x-1">
                <Avatar src={collab.AvatarUrl} size="20px" />
                <div>
                    <h1>{collab.Username}</h1>
                    <h1>{collab.Title}</h1>
                    {user.Location && 
                    <div className="flex items-center text-sm">
                        <GrLocation />
                        <h3>{user.Location}</h3>
                    </div>
                    }
                </div>
                <h2>{collab.Email}</h2>
            </div>
        </div>
    );
};
