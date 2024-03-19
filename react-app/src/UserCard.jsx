import Avatar from "./Avatar";
import Tag from "./Tag";

export default function UserCard({ imageUrl, skills, skillsRequired, skillsPreferred }) {
    return(
        <div className="my-2">
            <Avatar 
                src={imageUrl}
                alt="https://github.com/shadcn.png"
                size="20px"
            />
            <div className="flex flex-row">
                <div>Skills: </div>
                {skills.map((skill, index) => (
                    <Tag skill={skill} index={index} />
                ))}
            </div>
            <div className="flex flex-row">
                <div>Required: </div>
                {skillsRequired.map((skill, index) => (
                    <Tag skill={skill} index={index} />
                ))}
            </div>
            <div className="flex flex-row">
                <div>Preferred: </div>
                {skillsPreferred.map((skill, index) => (
                    <Tag skill={skill} index={index} />
                ))}
            </div>
        </div>
    );
}