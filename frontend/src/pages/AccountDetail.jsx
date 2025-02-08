import React, { useEffect, useState } from "react";
import accountApi from "../api/modules/account.api.js";
import movieAPI from "../api/modules/movie.api.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import Container from "../components/common/Container.jsx";
import MediaGrid from "../components/common/MediaGrid.jsx";
import { Typography, Button } from "@mui/material";

function AccountDetail() {
    const [account, setAccount] = useState(null);
    const [Cart, setCart] = useState([]); 
    const { username } = useParams();
    const navigate = useNavigate(); 
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getInfo = async (username) => {
            try {
                const accountInfo = await accountApi.getInfo(username);
                if (accountInfo) {
                    setAccount(accountInfo);
                } else {
                    console.error('Account info is null');
                }

                const movieInfoPromises = accountInfo.CartFilm.map(async (movieId) => {
                    const movieInfo = await movieAPI.getInfo(movieId);
                    return movieInfo.response.data;
                });
                const CartMovies = await Promise.all(movieInfoPromises);
                setCart(CartMovies);

            } catch (error) {
                console.error('Error fetching account:', error);
            }
        };
        getInfo(username);
    }, [username]);

    const handleCheckout = () => {
        const totalPrice = Cart.reduce((acc, movie) => {
            if (movie.vote_average <= 5) return acc + 50000;
            if (movie.vote_average <= 8) return acc + 80000;
            return acc + 100000;
        }, 0);

        navigate('/checkout', { state: { cartMovies: Cart, totalPrice } });
    };

    return (
        <div style={{ margin: "2em 1.5em 0 2em" }}>
            <Container header={'Account Detail'}>
                {account && (
                    <>
                        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", margin: "0 0 2% 0" }}>
                            <img
                                src={account.avatar}
                                alt="avatar"
                                width={260}
                                height={250}
                            />
                            <div style={{
                                margin: "10px 10px auto 20px",
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <Typography><b>Name:</b> {account.name}</Typography>
                                <Typography><b>Email:</b> {account.email ? account.email : "null"}</Typography>
                                <Typography><b>Gender:</b> {account.gender}</Typography>
                            </div>
                        </div>
                    </>
                )}
            </Container>
            <Container header={'Carts'}>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                    <MediaGrid mediaList={Cart} mediaType="movie" />
                </div>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleCheckout} 
                    style={{ marginTop: "20px" }}
                >
                    Proceed to Checkout
                </Button>
            </Container>
        </div>
    );
}

export default AccountDetail;