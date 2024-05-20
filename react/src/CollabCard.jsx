import Avatar from "./Avatar";
import { GrLocation } from "react-icons/gr";
import SocialLinks from "./SocialLinks";
import { MdOutlineEmail } from "react-icons/md";
export default function CollabCard({collab}) {
    return(
        collab &&
        <div className="p-3 border-b border-gray-600">
            <div className="flex">
                <Avatar className="size-5" src={collab.AvatarUrl} />
                <div className="ml-1">
                    <h1 className="-my-2 text-lg">{collab.Username}</h1>
                    {collab.Title &&
                    <h2>{collab.Title}</h2>
                    }
                    
                    {collab.Location && 
                    <div className="flex items-center text-sm">
                        <GrLocation />
                        <h3>{collab.Location}</h3>
                    </div>
                    }
                    {collab.Email && 
                    <div className="flex items-center text-sm">
                        <MdOutlineEmail />
                        <h2>{collab.Email}</h2>
                    </div> 
                    }
                    
                </div>
                <SocialLinks className="ml-8 text-xl" user={collab} />
            </div>
        </div>
    );
};
