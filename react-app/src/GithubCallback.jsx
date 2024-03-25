import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GithubCallback() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token');
  
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
  console.log(accessToken)
  console.log(refreshToken)
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  return (
    <></>
  );
};