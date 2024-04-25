import { API_BASE_URL } from "./config";

const clientId = '88c7fe2b6f54a8507680';
const redirectUri = `${API_BASE_URL}/v1/auth/callback`;
const scope = 'read:user'; 

export function handleLogin() {
    const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    window.location.href = authorizationUrl;
};

export async function getData(path="", accessToken="") {
    const response = await fetch(API_BASE_URL+path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        },
      });
      return response.json();
};


export async function postData(path = "", data = {}, accessToken="") {
    const response = await fetch(API_BASE_URL+path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      },
      body: JSON.stringify(data),
    });
    return response.json();
}

export async function patchData(path = "", data = {}, accessToken = "") {
  try {
      const response = await fetch(API_BASE_URL + path, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + accessToken
          },
          body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      return responseData;
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
  }
}

  

  

