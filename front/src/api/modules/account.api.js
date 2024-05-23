import publicClient from "../client/public.client.js";


const accountApi = {
    login : async (data) => {
        const url = '/account/login';
        try {
            const request = await publicClient.post(url, data);
            return request;
        } catch (err) {
            return { err };
        }
    },
    signUp : async (data) => {
        const url = '/account/signup';
        try {
            const request = await publicClient.post(url, data);
            return request;
        } catch (err) {
            return { err };
        }
    },
    getInfo: async (username) => {
    const url = `account/${username}`;
    try {
        const response = await publicClient.get(url);
        return response;
    } catch (err) {
        return { err };
    }
    },
    getFavorite: async (username) => {
    const url = `account/${username}/favorite`;
    try {
        const response = await publicClient.get(url);
        return response;
    } catch (err) {
        return { err };
    }
    },
    getAllUsers: async () => {
    const url = '/account/all';
    try{
        const response = await publicClient.get(url);
        return response;
    }
    catch(err){
        return {err};
    }
    }
    ,
    addFavorite: async (username, movieId, accessToken) => {
        const url = `account/${username}/addfavorite/${movieId}`;
        console.log(url);
        try {
            const response = await publicClient.post(
                url,
                {},
                {
                    headers: {
                    token: `Bearer ${accessToken}`
                    }
                }
            );
            return response;
        } catch (err) { 
            console.log(err);
            return { err };
        }
    },
    removeFavorite: async (username, movieId, accessToken) => {
        const url = `account/${username}/removefavorite/${movieId}`;
        try {
            const response = await publicClient.post(
                url,
                {},
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
    updatePassword: async (username, data, accessToken) => {
        const url = `account/${username}/update-password`;
        try {
            const response = await publicClient.put(
                url,
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
    updateProfile: async (username, data, accessToken) => {
        const url = `account/${username}/update-profile`;
        try {
            const response = await publicClient.put(
                url,
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
    adminDeleteAccount: async (data) => {
        const url = '/account/admin-delete';
        try {
            const response = await publicClient.delete(url, { data: data });
            console.log(response);
            return response;
        } catch (err) {
            return { err };
        }
    },
    resetPassword: async (data) => {
        const url = '/account/reset-password';
        try {
            const response = await publicClient.put(url, data);
            return response;
        } catch (err) {
            return { err };
        }
    },
    sendOTPVerify: async (data) => {
        const url = '/account/send-otp';
        try {
            const response = await publicClient.post(url, data);
            return response;
        } catch (err) {
            return { err };
        }
    },
    verifyOTP: async (data) => {
        const url = '/account/verify-otp';
        try {
            const response = await publicClient.post(url, data);
            return response;
        } catch (err) {
            return { err };
        }
    }

}
export default accountApi;