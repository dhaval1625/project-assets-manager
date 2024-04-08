import { QueryClient } from "@tanstack/react-query";
import { displayMessage } from "./helper";

export const queryClient = new QueryClient();

export default async function fetchData(url, config) {
   try {
      let fetchConfig = null;

      if (config) {
         fetchConfig = {
            method: config?.method || 'GET',
            body: config.payload ? JSON.stringify(config.payload) : undefined,
            headers: {
               'Content-Type': 'application/json',
            },
            signal: config?.signal || undefined,
         };

         if(config.token) {
            fetchConfig.headers.Authorization = 'Bearer ' + config.token;
         }
      }

      const res = await fetch(url, fetchConfig);
      const data = await res.json();
      if(!data.status) {
         throw data;
      }
      config.showSuccessMessage && displayMessage(data.message);
      return data.data;
   } catch (error) {
      console.log(error);
      data.status === 0 && displayMessage(error.message, true);
      throw new Error(error.message);
   }
}
