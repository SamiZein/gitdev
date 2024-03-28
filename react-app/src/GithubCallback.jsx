import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GithubCallback() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('access_token');
  const expiresAt = urlParams.get('expires_at');
  
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('expires_at', expiresAt);
  console.log(accessToken)
  console.log(expiresAt)
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  return (
    <></>
  );
};