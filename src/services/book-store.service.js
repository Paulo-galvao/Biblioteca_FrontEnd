import axios from "axios";

const url_api = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export async function storeBook(body) {
    try {
        const response = await axios.post(`${url_api}/books`, {
            ...body
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }
        );

        alert(response.data.message);
        
    } catch (error) {
        alert(error);
    }
}