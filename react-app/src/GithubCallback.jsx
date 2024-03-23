import React, { useEffect } from 'react';

const GitHubCallback = () => {
  useEffect(() => {
    const callbackUrl = 'http://localhost:5173/';
    const clientId = '88c7fe2b6f54a8507680';
    const clientSecret = '5cf0affc3af84e2a4d98c31fdd8e3461dd7bb656';

    // Extract the authorization code from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    // Function to exchange the authorization code for an access token
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: authorizationCode,
            redirect_uri: callbackUrl,
          }),
        });

        const data = await response.json();
        const accessToken = data.access_token;
        // Store the access token securely and use it for subsequent API requests
        console.log('Access Token:', accessToken);
      } catch (error) {
        console.error('Error exchanging authorization code:', error);
      }

    };

    // Call the fetchAccessToken function when the component mounts
    fetchAccessToken();
  }, []);

  return <div>Callback received. Exchanging authorization code for access token...</div>;
};

export default GitHubCallback;