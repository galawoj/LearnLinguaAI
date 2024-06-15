import { ApiRequestBodyType } from "../types/ApiRequestBodyType";



export async function fetchGptResponse(apiRequestBody:ApiRequestBodyType){
    return fetch("https://wgservice-apim.azure-api.net/backend/api", {
        method: "POST",
        headers: {
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