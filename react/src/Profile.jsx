import { useState, useContext, useEffect } from 'react';
import Input from './Input';
import { AuthContext } from './AuthContext';
const Profile = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (isLoggedIn && user && user.Name && user.Bio && user.Location) {
      setName(user.Name);
      setBio(user.Bio);
      setLocation(user.Location);
    } 
  },[user, isLoggedIn]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    isLoggedIn &&
    <div className="container px-4 mx-auto my-10">
      <div className="p-6 border rounded-lg border-dark-border bg-dark-bg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Profile</h2>
          {isEditing ? (
            <button
              className="px-4 py-2 font-semibold transition-colors duration-300 bg-green-600 rounded text-dark-text hover:bg-green-700"
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
          )}
        </div>
        <div className="space-y-2">
          <Input 
            type="text"
            value={name}
            onChange={handleNameChange}
            label="Name"
            disabled={!isEditing}
          />

          <Input 
            type="text"
            value={bio}
            onChange={handleBioChange}
            label="Bio"
            disabled={!isEditing}
          />

          <Input 
            type="text"
            value={location}
            onChange={handleLocationChange}
            label="Location"
            disabled={!isEditing}
          />

        </div>
      </div>
    </div>
  );
};

export default Profile;