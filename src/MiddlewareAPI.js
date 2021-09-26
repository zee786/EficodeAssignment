import camelize from "camelize";
import { has, isEmpty } from "lodash";

async function post(path, body, { headers = {}, ...rest } = {}) {
  const _headers = {
    "Content-Type": "application/json",
    ...headers
  };
  try {
    const response = await fetch(`https://${path}`, {
      ...rest,
      method: "POST",
      headers: await _headers,
      body: JSON.stringify(body),
      mode: "cors"
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function getToken() {
  const body = {
    email: "mszesh@gmail.com",
    password: "Madiha@786"
  };
  const singupAPI = "https://opendata.hopefully.works/api/signup";
  const response = await post(singupAPI, body);
  return response;
}

async function addAuthHeader(headers = {}) {
  const jwtToken = await getToken();
  console.log("jwtToken", jwtToken);
  const defaultHeader = jwtToken ? { Authorization: jwtToken } : null;
  if (!isEmpty(headers)) {
    return { ...headers, ...defaultHeader };
  }
  return defaultHeader;
}

export async function login() {
  const body = {
    email: "mszesh@gmail.com",
    password: "Madiha@786"
  };
  const lognAPI = "opendata.hopefully.works/api/login";
  const response = await post(lognAPI, body);
  return parseBody(await parseResponse(response));
}

async function parseBody(data) {
  try {
    return data?.name === "AbortError"
      ? null
      : has(data, "body")
      ? data.body
      : data;
  } catch (error) {
    return null;
  }
}

async function parseResponse(response, isCamelCase = true) {
  let data;
  try {
    if (!response.ok) {
      const error = new Error();
      error.apiErrorCode = response.error;
      error.apiErrorMessage = response.message || "";
      throw error;
    }
    data = await response.json();
    if (isCamelCase) {
      data = camelize(data);
    }
  } catch (error) {
    data = null;
  }
  return data;
}
// read
async function get(path) {
  try {
   
    const loginResponse = await login();
    const authToken = loginResponse.accessToken;
    if (authToken) {
      const response = await fetch(`https://${path}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        mode: "cors"
      });

      return response;
    }
  } catch (error) {
    return error;
  }
}

export async function getEvents() {
 
  const eventsAPI = "opendata.hopefully.works/api/events";
  const response = await get(eventsAPI);
  return parseBody(await parseResponse(response));
}
