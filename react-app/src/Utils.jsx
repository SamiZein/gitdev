const apiBaseURL = process.env.VITE_APP_API_BASE_URL;
const clientId = '88c7fe2b6f54a8507680';
const redirectUri = `${apiBaseURL}/auth/github/callback`;
const scope = 'user'; 

export default function handleLogin() {
    const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    window.location.href = authorizationUrl;
};




