import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { GrLocation } from "react-icons/gr";

export default function UserCard({ user, onClick }) {
    const [userActivity, setUserActivity] = useState("")
    const daysSince = (timestamp) => {
        const truncatedTimestamp = timestamp.split('.')[0];
        const givenDate = new Date(truncatedTimestamp);
        const currentDate = new Date();
        const timeDifference = currentDate - givenDate;
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const daysDifference = Math.floor(timeDifference / millisecondsPerDay);
        return daysDifference;
    };
    useEffect( () => {
        if(user == null){
            return
        }
        const days = daysSince(user.UpdatedAt);
        let msg = "Active "
        msg += days>0?daysSince(user.UpdatedAt)+" days ago":" today";
        setUserActivity(msg);
    },[user]);

    return(
        <div onClick={onClick} className="p-3 border-b border-gray-600">
            <div className="flex items-center">
                <Avatar 
                    src={user.AvatarUrl}
                    className="size-8"
                />
                <div className="ml-2">
                    <h1 className="-mb-1.5 text-xl font-semibold">{user.Title}</h1>
                    <h2 className="ml-2">{user.Username}</h2>
                    {user.Location && 
                    <div className="flex items-center text-sm">
                        <GrLocation />
                        <h3>{user.Location}</h3>
                    </div>
                    }
                </div>
            </div>
            <h3 className="text-xs">{userActivity}</h3>
        </div>
    );
}