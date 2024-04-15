import Avatar from "./Avatar";
import Tag from "./Tag";

export default function UserCard({ user, skills, skillsRequired, skillsPreferred, onClick }) {
    return(
        <div onClick={onClick} className="p-3 border-b border-gray-600">
            <div className="flex items-center">
                <Avatar 
                    src={user.AvatarUrl}
                    size="20px"
                />
                <div className="ml-2">
                    <div className="-mb-1.5">{user.Username}</div>
                    <div className="ml-1 text-xs">{user.Role}</div>
                </div>
            </div>

            
            <div className="flex">
                <div>Skills: </div>
                {skills.map((skill, index) => (
                    <Tag skill={skill} key={index} />
                ))}
            </div>
            <div className="flex">
                <div>Required: </div>
                {skillsRequired.map((skill, index) => (
                    <Tag skill={skill} key={index} />
                ))}
            </div>
            <div className="flex">
                <div>Preferred: </div>
                {skillsPreferred.map((skill, index) => (
                    <Tag skill={skill} key={index} />
                ))}
            </div>
        </div>
    );
}