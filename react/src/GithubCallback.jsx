import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./AuthContext";
import { API_BASE_URL } from "./config";

export default function GithubCallback() {
  const { login} = useContext(AuthContext);

  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('access_token');
  const fetchUser = async () => {
    try{
      const response = await fetch(`${API_BASE_URL}/v1/users/self`, {
        headers: { Authorization: 'Bearer ' + accessToken }
      });
      if (response.ok) {
          const data = await response.json();
          login(data);
      } else {
          throw new Error("Failed to fetch users");
      }
    } catch(error) {
        console.error("Error fetching users:", error);
        throw error;
    }
  };

  useEffect(() => {
    fetchUser();
    navigate('/');
  }, [navigate]);
  return (
    <></>
  );
};