import { TbHammer } from "react-icons/tb";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./config";
import UserPanel from "./UserPanel";

export default function Users() {
  const skills = ["UX", "UI", "React", "Tailwind"];
  const skillsRequired = ["Backend"];
  const skillsPreferred = ["Go"];
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    fetchUsers(); 
  },[]);

  const fetchUsers = async () => {
    try{
      const response = await fetch(`${API_BASE_URL}/v1/users`)
      if (response.ok) {
          const data = await response.json();
          setUsers(data)
      } else {
          throw new Error("Failed to fetch users");
      }
    } catch(error) {
        console.error("Error fetching users:", error);
        throw error;
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <div id="devs-header" className="pt-2 pl-2">
        <div className="flex">
          <TbHammer className="text-3xl place-self-center" />
          <div className="text-2xl">Developers</div>
        </div>
        <div>Your next collaborator could be right here.</div>
      </div>
      <div className="flex">
        <div id="users-section" className="p-4 w-96">
          {users?.length
          ?  users.map((user) => 
            <UserCard 
              onClick={() => selectUser(user)}
              key={user.ID}
              user={user}
              skills={skills}
              skillsRequired={skillsRequired}
              skillsPreferred={skillsPreferred}
            />
          ): <p>No users to display</p>
          }
        </div>
        <UserPanel user={selectedUser} />
      </div>
    </div>
  );
}