import axios from "axios";

const url_api = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export async function updateBook(body, book_id) {
  try {
    const response = await axios.put(`${url_api}/books/${book_id}`, {...body}, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log(response);
    alert(response.data.message);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}
