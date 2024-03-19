import Avatar from "./Avatar";
import Tag from "./Tag";

export default function UserCard({ imageUrl, skills, skillsRequired, skillsPreferred }) {
    return(
        <>
            <Avatar 
                src={imageUrl}
                alt="https://github.com/shadcn.png"
                size="20px"
            />
            <div>Skills</div>
            {skills.map((skill, index) => (
                <Tag skill={skill} index={index} />
            ))}
            <div>Required</div>
            {skillsRequired.map((skill, index) => (
                <Tag skill={skill} index={index} />
            ))}
            <div>Preferred</div>
            {skillsPreferred.map((skill, index) => (
                <Tag skill={skill} index={index} />
            ))}
        </>
    );
}