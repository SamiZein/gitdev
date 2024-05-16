import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Tag from "./Tag";

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
    useEffect((user)=>{
        if(user == null){
            return
        }
        days = daysSince(user.UpdatedAt);
        msg = "Active " + days?daysSince(user.UpdatedAt)+" ago":" today";
        setUserActivity(msg);
    },[user]);

    return(
        <div onClick={onClick} className="p-3 border-b border-gray-600">
            <div className="flex items-center">
                <Avatar 
                    src={user.AvatarUrl}
                    size="20px"
                />
                <div className="ml-2">
                    <h1 className="-mb-1.5 text-lg">{user.Title}</h1>
                    <h2 className="ml-1 text-sm">{user.Username}</h2>
                </div>
            </div>
            <h3 className="text-xs"> </h3>
        </div>
    );
}