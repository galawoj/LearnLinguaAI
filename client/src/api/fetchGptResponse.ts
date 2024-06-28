import { ApiRequestBodyType } from "../types/ApiRequestBodyType";



export async function fetchGptResponse(apiRequestBody:ApiRequestBodyType){
  try{
    const response = await fetch("https://wgservice-apim.azure-api.net/backend/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })

    if(!response.ok){
      throw new Error('Error response from API ' + response.statusText);
    }
   
   const data = await response.json()
   return data
  }catch(error) {
        console.error('Fetch error:', error);
        throw error;
      };
}