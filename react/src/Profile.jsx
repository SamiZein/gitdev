import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { patchData } from './Utils';
import './Profile.css';
import Login from './Login';
import UserLinguistics from './UserLinguistics';

export const Profile = () => {
  const { user, login, isLoggedIn } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [title, setTitle] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [twitter, setTwitter] = useState('');
  const inputStyles = "w-full h-10 px-3 py-2 border rounded bg-dark-bg border-dark-border focus:outline-none focus:border-dark-accent";
  const labelStyles = "block mb-2 font-semibold text-dark-text-secondary";

  useEffect(() => {
    if (!isLoggedIn) return;
    setName(user.Name);
    setBio(user.Bio);
    setTitle(user.Title);
    setEmail(user.Email);
    setLinkedIn(user.LinkedinUrl);
    setTwitter(user.TwitterUrl);

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
        "title": title,
        "linkedin": linkedIn,
        "twitter": twitter
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

  const fields = [
    { label: "Name", name: "name", value: name, setFunction: setName },
    { label: "Title", name: "title", value: title, setFunction: setTitle },
    { label: "Email", name: "email", value: email, setFunction: setEmail },
    { label: "LinkedIn", name: "linkedin", value: linkedIn, setFunction: setLinkedIn },
    { label: "Twitter", name: "twitter", value: twitter, setFunction: setTwitter },
  ];

  return (
      <div className="p-6 m-4 border rounded-lg border-dark-border bg-dark-bg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-semibold">Profile</h2>
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
            <UserLinguistics githubID={user.GithubID} />
            {fields.map(({ label, name, value, setFunction }) => (
              <div key={name}>
                <label className={labelStyles}>{label}</label>
                <input
                  className={inputStyles}
                  type="text"
                  name={name}
                  value={value}
                  onChange={(e) => handleInputChange(e, setFunction)}
                  disabled={!isEditing}
                />
              </div>
            ))}
            <label className={labelStyles}>Bio</label>
            <textarea
              className="w-full h-32 px-3 py-2 border rounded resize-none bg-dark-bg border-dark-border focus:outline-none focus:border-dark-accent"
              value={bio}
              onChange={(e) => handleInputChange(e, setBio)}
              disabled={!isEditing}
            />
          </div>
          : <Login  className="m-1 ml-4" />
        }
      </div>
  );
};

export default Profile;
