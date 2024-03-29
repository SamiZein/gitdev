import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GithubCallback() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('access_token');
  
  localStorage.setItem('access_token', accessToken);
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  return (
    <></>
  );
};