import { ApiRequestBodyType } from "../types/ApiRequestBodyType";

const API_KEY: string = import.meta.env.VITE_API_KEY;

export async function fetchGptResponse(apiRequestBody:ApiRequestBodyType){
    return fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Fetch error:', error);
        throw error;
      });
}