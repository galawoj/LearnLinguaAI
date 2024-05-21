import {type ApiRequestBodyType } from "../types/ApiRequestBodyType";

export async function fetchGptResponse(apiKey:string,apiRequestBody:ApiRequestBodyType){
    return fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + apiKey,
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