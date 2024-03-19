import { VscGithub } from "react-icons/vsc";
import UserCard from "./UserCard";
export default function Developers() {
    const skills = ["UX", "UI", "React", "Tailwind"]
    const skillsRequired = ["Backend"]
    const skillsPreferred = ["Go"]

    return (
        <>
            <div 
                id="devs-header" 
                className= "pt-2 pl-2 "
            >
                <div className="flex flex-row">
                    <VscGithub className="text-3xl place-self-center" />
                    <div className="text-2xl">Developers</div>
                </div>
                <div>Your next collaborator could be right here.</div>

            </div>
            <div id="users-section"
                className="p-4 my-2"
            >
                <UserCard 
                    imageUrl="https://github.com/shadcn.png"
                    skills={skills}
                    skillsRequired={skillsRequired}
                    skillsPreferred={skillsPreferred}
                />
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