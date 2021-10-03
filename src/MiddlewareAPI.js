import camelize from "camelize";
import { has } from "lodash";

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
    const response = await fetch(`http://${path}`, {
      headers: {
        "Content-Type": "application/json",
        mode: "cors"
      }
    });
    return response;
  } catch (error) {
    return error;
  }
}

export async function getEvents(token) {
  const eventsAPI = "localhost:5000/getAllEvents";
  const response = await get(eventsAPI, token);
  return parseBody(await parseResponse(response));
}
