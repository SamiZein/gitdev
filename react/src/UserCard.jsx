import Avatar from "./Avatar";
import Tag from "./Tag";

export default function UserCard({ user, skills, skillsRequired, skillsPreferred, onClick }) {
    return(
        <div onClick={onClick} className="my-2">
            <div className="flex flex-row">
                <Avatar 
                    src={user.AvatarUrl}
                    alt="https://github.com/shadcn.png"
                    size="20px"
                />
                <div>{user.Username}</div>
            </div>
            <div className="flex flex-row">
                <div>Skills: </div>
                {skills.map((skill, index) => (
                    <Tag skill={skill} key={index} />
                ))}
            </div>
            <div className="flex flex-row">
                <div>Required: </div>
                {skillsRequired.map((skill, index) => (
                    <Tag skill={skill} key={index} />
                ))}
            </div>
            <div className="flex flex-row">
                <div>Preferred: </div>
                {skillsPreferred.map((skill, index) => (
                    <Tag skill={skill} key={index} />
                ))}
            </div>
        </div>
    );
}