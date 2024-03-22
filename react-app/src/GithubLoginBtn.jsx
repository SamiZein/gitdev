import React from 'react';

const GitHubLoginButton = () => {
  const clientId = '88c7fe2b6f54a8507680';
  const redirectUri = 'http://localhost:5173/';
  const scope = 'user'; // Specify the desired scope(s)

  const handleLogin = () => {
    const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    window.location.href = authorizationUrl;
  };

  return <button onClick={handleLogin}>Login with GitHub</button>;
};

export default GitHubLoginButton;