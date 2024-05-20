import { TbHammer } from "react-icons/tb";
import UserCard from "./UserCard";
import { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "./config";
import UserPanel from "./UserPanel";
import { AuthContext } from "./AuthContext";

export default function Users() {
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, isLoggedIn} = useContext(AuthContext);


  useEffect(() => {
    fetchUsers(); 
  },[]);

  const fetchUsers = async () => {
    try{
      let githubID = 0;
      if (isLoggedIn){
        githubID = user.GithubID
      }
      const response = await fetch(`${API_BASE_URL}/v1/users`,{
        headers: {
          Authorization: githubID.toString(),
        },
      });
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

  const selectUser = async (user) => {
    try{
      const response = await fetch(`${API_BASE_URL}/v1/users/${user.GithubID}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedUser(data);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch(error) {
        console.error("Error fetching users:", error);
        throw error;
    }
  };

  return (
    <div className="h-full">
      <div id="devs-header" className="pt-2 pl-2">
        <div className="flex text-4xl font-semibold">
          <TbHammer className="place-self-center" />
          <h1>Developers</h1>
        </div>
        <div>Your next collaborator could be right here.</div>
      </div>
      <div className="flex h-full">
        <div id="users-section"
          className=" min-w-80 max-w-120"
        >
          {users?.length
          ?  users.map((user) => 
            <UserCard 
              onClick={() => selectUser(user)}
              key={user.ID}
              user={user}
            />
          ): <p>No users to display</p>
          }
        </div>
        <UserPanel panelUser={selectedUser} />
      </div>
    </div>
  );
}