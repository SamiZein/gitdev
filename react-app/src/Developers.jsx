import { FaGithub } from "react-icons/fa";
import './Developers.css';
import UserCard from "./UserCard";
export default function Developers() {
    const skills = ["UX", "UI", "React", "Tailwind"]
    const skillsRequired = ["Backend"]
    const skillsPreferred = ["Go"]

    return (
        <>
            <div className="devs-header">
                <FaGithub />
                <div className="devs-header-title">Developers</div>
            </div>
            <div>Your next collaborator could be right here.</div>
            <div className="users-section">
                <UserCard 
                    imageUrl="https://github.com/shadcn.png"
                    skills={skills}
                    skillsRequired={skillsRequired}
                    skillsPreferred={skillsPreferred}
                />
            </div>
        </>
    );
}