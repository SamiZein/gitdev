import Avatar from "./Avatar";
import { GrLocation } from "react-icons/gr";
import SocialLinks from "./SocialLinks";

export default function CollabCard({collab}) {
    return(
        collab &&
        <div className="p-3 border-b border-gray-600">
            <div className="flex space-x-1">
                <Avatar className="place-self-center size-5" src={collab.AvatarUrl} />
                <div>
                    <h1>{collab.Username}</h1>
                    <h1>{collab.Title}</h1>
                    {collab.Location && 
                    <div className="flex items-center text-sm">
                        <GrLocation />
                        <h3>{collab.Location}</h3>
                    </div>
                    }
                    <h2>{collab.Email}</h2>
                </div>
                <SocialLinks user={collab} />
            </div>
        </div>
    );
};
