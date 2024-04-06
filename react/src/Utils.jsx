import { API_BASE_URL } from "./config";

const clientId = '88c7fe2b6f54a8507680';
const redirectUri = `${API_BASE_URL}/v1/auth/callback`;
const scope = 'read:user'; 

export default function handleLogin() {
    const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    window.location.href = authorizationUrl;
};

