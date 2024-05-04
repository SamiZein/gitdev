import { useState, useContext, useEffect } from 'react';
import Input from './Input';
import { AuthContext } from './AuthContext';
import { patchData } from './Utils';
import './Profile.css';
import Login from './Login';
const Profile = () => {
  const { user, login, isLoggedIn } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      setName(user.Name);
      setBio(user.Bio);
      setTitle(user.Title);
      setEmail(user.Email)
    } 
  },[user, isLoggedIn]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async() => {
    try {
      const updatedUser = await patchData("/v1/users",{
        "name": name,
        "email": email,
        "bio": bio,
        "title": title
      }, user?.AccessToken);
      login(updatedUser);

    } catch (error) {
        console.error("Error updating user:", error);
    }
    setIsEditing(false);
  };
  
  const handleInputChange = (e, setFunction) => {
    setFunction(e.target.value);
  };
  
  return (
    <div className="container px-4 mx-auto my-10">
      <div className="p-6 border rounded-lg border-dark-border bg-dark-bg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Profile</h2>
          { isLoggedIn && (
            isEditing ? (
            <button
              className="px-4 py-2 font-semibold transition-colors duration-300 rounded bg-dark-success text-dark-success-text hover:bg-green-700"
              onClick={handleSaveClick}
            >
              Save
            </button>
          ) : (
            <button
              className="px-4 py-2 font-semibold text-gray-700 transition-colors duration-300 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )
        )}
        </div>
        { isLoggedIn ?
          <div className="space-y-2">
            <label className="block mb-2 font-semibold text-dark-text-secondary">Name</label>
            <input
              className="w-full h-10 px-3 py-2 border rounded bg-dark-bg border-dark-border focus:outline-none focus:border-dark-accent"
              type="text"
              value={name}
              onChange={(e) => handleInputChange(e,setName)}
              placeholder={name}
              disabled={!isEditing}
            />
            
            <label className="block mb-2 font-semibold text-dark-text-secondary">Email</label>
            <input
              className="w-full h-10 px-3 py-2 border rounded bg-dark-bg border-dark-border focus:outline-none focus:border-dark-accent"
              type="text"
              value={email}
              onChange={(e) => handleInputChange(e,setEmail)}
              placeholder={email}
              disabled={!isEditing}
            />

            <label className="block mb-2 font-semibold text-dark-text-secondary">Bio</label>
            <textarea
              className="w-64 h-32 px-3 py-2 border rounded resize-none bg-dark-bg border-dark-border focus:outline-none focus:border-dark-accent"
              value={bio}
              onChange={(e) => handleInputChange(e,setBio)}
              placeholder={bio}
              disabled={!isEditing}
            />

            <label className="block mb-2 font-semibold text-dark-text-secondary">Title</label>
            <input
              className="w-full h-10 px-3 py-2 border rounded bg-dark-bg border-dark-border focus:outline-none focus:border-dark-accent"
              type="text"
              value={title}
              onChange={(e) => handleInputChange(e,setTitle)}
              placeholder={title}
              disabled={!isEditing}
            />
          </div>
          : <Login  className="m-1 ml-4" />
        }
      </div>
    </div>
  );
};

export default Profile;