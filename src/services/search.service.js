import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

export async function searchBook(title) {
    try {
      const response = await axios.get(`${api_url}/books/search`, {
        params: {
          title: title,
        },
      });

      if (response.status === 204) {
        throw new Error("Nenhum resultado encontrado");
      }
      const books = response.data.data;
      return books;
    } catch (error) {
      if (error.status === 400) {
        const message = error.response.data.message;
        throw error(message);
      }
      throw error.message;
    } 
  }