
import publicClient from "../client/public.client.js";

const personApi = {
    getDetails : async (id) => {
        try {
            const response = await publicClient.get(`person/${id}`);
            if(!response) return { err : "No data found" };
            return response;
        } catch (err) { return { err }; }
    },
    getMovieCredits : async (id) => {
        try {
            const response = await publicClient.get(`person/${id}/movie_credits`);
            if(!response) return { err : "No data found" };
            return response;
        } catch (err) { return { err }; }
    },
    searchPerson : async (query) => {
        try {
            const response = await publicClient.get(`person/search?query=${query}`);
            return { response };
        } catch (err) { return { err }; }
    },
}
export default personApi;
