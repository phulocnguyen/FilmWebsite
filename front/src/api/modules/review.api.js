//test
import publicClient from '../client/public.client.js';
const reviewApi = {
    async getDetails(id) {
        try {
            const response = await publicClient.get(`reviews/${id}`);
            if (!response) return { err: "No data found" };
            return response;
        } catch (err) {
            return { err };
        }
    },
    async createReview(data, accessToken) {
        try {
            const response = await publicClient.post(
                'reviews/create',
                data,
            {
                headers: {
                    token: `Bearer ${accessToken}`
                }
            }
            );
            return response;
        } catch (err) {
            return { err };
        }
    },
    async getReviews(movieId) {
        try {
            const response = await publicClient.get(`reviews/${movieId}`);
            if (!response) return { err: "No data found" };
            return response;
        }catch(err) {
            return { err };
        }
    },
    async getDetailByID(id) {
        try {
            const response = await publicClient.get(`reviews/detail/${id}`);
            if (!response) return { err: "No data found" };
            return response;
        } catch (err) {
            return { err };
        }
    },
    async deleteReview(id, accessToken) {
        try {
            const response = await publicClient.delete(`reviews/delete/${id}`, {
                headers: {
                    token: `Bearer ${accessToken}`
                }
            });
            return response;
        } catch (err) {
            return { err };
        }
    }


}


export default  reviewApi;