import { TbHammer } from "react-icons/tb";
import UserCard from "./UserCard";
export default function Developers() {
    const skills = ["UX", "UI", "React", "Tailwind"]
    const skillsRequired = ["Backend"]
    const skillsPreferred = ["Go"]

    useEffect(() => {
        // Define a function to fetch data
        async function fetchData() {
          try {
            const response = await fetch('https://api.example.com/data');
            const jsonData = await response.json();
            setData(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
        fetchData();
      }, []);

    return (
        <>
            <div 
                id="devs-header" 
                className= "pt-2 pl-2 "
            >
                <div className="flex flex-row">
                    <TbHammer className="text-3xl place-self-center" />
                    <div className="text-2xl">Developers</div>
                </div>
                <div>Your next collaborator could be right here.</div>

            </div>
            <div id="users-section"
                className="p-4"
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