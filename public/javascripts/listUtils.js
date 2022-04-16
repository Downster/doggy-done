import { fetchWithToken } from "./utils.js";

export const genLists = async () => {
    const response = await fetchWithToken('/lists');
    return await response.json();
}
