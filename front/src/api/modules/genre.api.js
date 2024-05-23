import publicClient from "../client/public.client";
const GenreApi = {
    async getGenreList() {
        try {
            const response = await publicClient.get('genre');
            return { response };
        } catch (err) {
            return { err };
        }
    }
}

export default GenreApi;