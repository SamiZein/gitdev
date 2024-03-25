import React from 'react';
import handleLogin from './Utils';

const GitHubLoginButton = () => {
  return <button onClick={handleLogin}>Login with GitHub</button>;
};

export default GitHubLoginButton;