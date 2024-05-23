import React, { useEffect, useState } from "react";
import accountApi from "../api/modules/account.api.js";
import movieAPI from "../api/modules/movie.api.js";
import { Link, useParams } from "react-router-dom";
import Container from "../components/common/Container.jsx";
import MediaGrid from "../components/common/MediaGrid.jsx";
import {useAuth } from "../hooks/AuthContext.js";
import { Typography } from "@mui/material";

function AccountDetail() {
    const [account, setAccount] = useState(null);
    const [favorite, setFavorite] = useState([]); // [movie1, movie2, ...
    const { username } = useParams();
    const token = localStorage.getItem('token');
    // console.log('Token:', token);
    useEffect(() => {
        const getInfo = async (username) => {
            try {
                //console.log('Token:', token);
                const accountInfo = await accountApi.getInfo(username);
                console.log('Account info:', accountInfo);
                if (accountInfo) {
                    setAccount(accountInfo);
                } else {
                    console.error('Account info is null');
                }
                //console.log('Token:', token);
                //const favoriteList = await accountApi.getFavorite(username);
                // Use Promise.all to wait for all movieInfo requests to complete
                const movieInfoPromises = accountInfo.favoriteFilm.map(async (movieId) => {
                    const movieInfo = await movieAPI.getInfo(movieId);
                    return movieInfo.response.data;
                });
                const favoriteMovies = await Promise.all(movieInfoPromises);
                setFavorite(favoriteMovies);
               // console.log('Favorite movies:', favoriteMovies)
                

            } catch (error) {
                console.error('Error fetching account:', error);
            }
        };
        getInfo(username);
       
    }, [username]);
    return (
        <div style={{margin: "2em 1.5em 0 2em"}}>
            <Container header={'Account Detail'}>
                {account && (
                    <>
                        {/* <header>
                            <Link to={`/account/${account.username}`}>{account.username}</Link>
                        </header> */}
                        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", margin: "0 0 2% 0"}}>
                            <img
                            src={account.avatar}
                            alt="avatar"
                            width={260}
                            height={250}
                            />
                            <div style ={{
                                margin: "10px 10px auto 20px",
                                display: "flex",
                                flexDirection: "column",
                                }}>
                                <Typography><b>Name:</b> {account.name}</Typography>
                                <Typography><b>Email:</b> {account.email ? account.email : "null"}</Typography>
                                <Typography><b>Gender:</b> {account.gender}</Typography>
                            </div>
                            
                            {/* Display other properties as needed */}
                        </div>
                    </>
                )}
            </Container>
            {/* Favorite list */}
            <Container header={'Favorites'}>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row"}}>
                    <MediaGrid mediaList={favorite} mediaType="movie" />
                </div>
            </Container>
        </div>
    );
}

export default AccountDetail;
