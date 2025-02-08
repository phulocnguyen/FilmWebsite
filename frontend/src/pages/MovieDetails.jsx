import Container from "../components/common/Container.jsx";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import ImageHeader from "../components/common/ImageHeader";
import CircularRate from "../components/common/CircularRate";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CartBorderOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined.js";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import MediaSlider from "../components/common/MediaSlider.jsx";
import VideosSlide from "../components/common/VideosSlide.jsx";
import BackdropSlide from "../components/common/BackdropSlide.jsx";
import PosterSlide from "../components/common/PosterSlide.jsx";
import ReviewItem from "../components/common/ReviewItem.jsx";
import Review from "../components/Review/Review.jsx";

import reviewApi from "../api/modules/review.api.js";
import movieAPI from "../api/modules/movie.api.js";
import accountApi from "../api/modules/account.api.js";
import { Tab } from "@mui/material";
import { Tabs } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../hooks/AuthContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartIcon from "@mui/icons-material/ShoppingCart.js";

//test

function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState([]);
  const [backdrops, setBackdrops] = useState([]);
  const [posters, setPosters] = useState([]);
  const [similars, setSimilars] = useState([]);
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [isCart, setIsCart] = useState(false);
  const [CartList, setCartList] = useState([]);
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const user = useAuth().getUser();

  // const user = localStorage.getItem("user")
  //   ? localStorage.getItem("user")
  //   : null;
  // console.log("user in MovieDetail", user );
  // console.log("user parse in MovieDetail", JSON.parse(user));

  const username = user ? user.username : "null";

  let poster_path = "";
  let backdrop_path = "";
  const videoRef = useRef(null);
  useEffect(() => {
    setIsCart(false);
    window.scrollTo(0, 0);
    const getDetails = async (movieId) => {
      try {
        const movieInfo = await movieAPI.getInfo(movieId);
        if (movieInfo.response) {
          setMovie(movieInfo.response.data);
        } else if (movieInfo.err) {
          console.error("Error fetching movie info:", movieInfo.err);
        }

        const videos = await movieAPI.getVideos(movieId);
        if (videos.response) {
          setVideos(videos.response.data.results);
        } else if (videos.err) {
          console.error("Error fetching movie videos:", videos.err);
        }

        const credits = await movieAPI.getCredits(movieId);
        if (credits.response) {
          setCredits(credits.response.data.cast);
        } else if (credits.err) {
          console.error("Error fetching movie credits:", credits.err);
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
      }

      // const reviewList = await reviewApi.getReviews(movieId);

      // if(reviewList){
      //   console.log("reviewList", reviewList);
      //   setReviews(reviewList);
      // } else {
      //   console.log("Error fetching reviews");
      // }

      const imagesData = await movieAPI.getImages(movieId);
      if (imagesData.response) {
        setBackdrops(imagesData.response.backdrops);
        setPosters(imagesData.response.posters);
      } else if (backdrops.err) {
        console.error("Error fetching movie images:", backdrops.err);
      }

      const similars = await movieAPI.getSimilar(movieId);
      if (similars.response) {
        setSimilars(similars.response.data.results);
      } else if (similars.err) {
        console.error("Error fetching movie images:", similars.err);
      }
      if (token) {
        const CartData = user ? user.CartFilm : null;
        if (CartData) {
          setCartList(CartData);
          if (CartData.find((item) => item === movieId)) {
            setIsCart(true);
          }
        } else {
          console.log("Error fetching Cart list");
        }
      }
    };

    getDetails(movieId);
  }, [movieId]);
  // console.log(isCart);
  if (movie) {
    poster_path =
      (movie.poster_path &&
        `https://image.tmdb.org/t/p/original${movie.poster_path}`) ||
      "/film.jpg";
    backdrop_path =
      (movie.backdrop_path &&
        `https://image.tmdb.org/t/p/original${movie.backdrop_path}`) ||
      "/no_image.jpg";
  }

  useEffect(() => {
    const fetchData = async (username) => {
      try {
        if (token) {
          const cartData = await accountApi.getCart(username, token);
          console.log("cartData", cartData);
          if (cartData) {
            setCartList(cartData);
            if (cartData.includes(movieId)) {
              setIsCart(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchData(username);
  }, [movieId, username, token]);

  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    movie && (
      <>
        <ImageHeader imgPath={backdrop_path} />
        {/* Poster */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              width: { xs: "70%", sm: "50%", md: "35%" },
              margin: { xs: "0 auto 2rem", md: "2 4rem 0 0" },
            }}
          >
            <Box
              sx={{
                paddingTop: "150%",
                ...uiConfigs.style.backgroundImage(poster_path),
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              color: "text.primary",
              padding: { xs: "1rem", md: "2rem" },
            }}
          >
            <Stack spacing={4} maxHeight={"200%"}>
              {/* title */}
              <Typography
                variant="h4"
                fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                fontWeight="700"
                sx={{ ...uiConfigs.style.typoLines(2, "left") }}
              >
                {`${movie.title || movie.name} (${
                  movie.release_date.split("-")[0]
                })
              `}
              </Typography>
              {/* title */}

              {/* rate and genres */}
              <Stack direction="row" spacing={1} alignItems="center">
                {/* rate */}
                {movie.vote_average > 0 && (
                  <CircularRate value={movie.vote_average} />
                )}
                {/* rate */}
                <Divider orientation="vertical" />
                {/* genres */}
                {movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name} //genre.name
                    variant="filled"
                    color="warning"
                    clickable="true"
                    sx={{
                      fontWeight: "5", // Thiết lập độ đậm cho kiểu chữ
                      color: "white", // Thiết lập màu sắc cho kiểu chữ
                      backgroundColor: "darkred", // Thiết lập màu sắc cho nền
                      fontFamily: "'Arial', 'sans-serif'",
                    }}
                  />
                ))}
                {/* genres */}
              </Stack>
              {/* rate and genres */}

              {/* overview */}
              <Typography
                variant="body1"
                sx={{ ...uiConfigs.style.typoLines(5) }}
              >
                {movie.overview}
              </Typography>

              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{
                  alignItems: { xs: "center" },
                }}
              >
                <IconButton
                  variant="none"
                  size="large"
                  sx={{
                    color: isCart ? "darkred" : "inherit",
                  }}
                  onClick={async () => {
                    if (token) {
                      if (isCart) {
                        const res = await accountApi.removeCart(
                          username,
                          movieId,
                          token
                        );
                        if (res) {
                          setIsCart(false);
                          toast.success("Removed from Cart list", {
                            autoClose: 500,
                          });
                        } else {
                          toast.error("Error removing from Cart list");
                        }
                      } else {
                        const res = await accountApi.addCart(
                          username,
                          movieId,
                          token,
                      
                        );
                        if (res) {
                          setIsCart(true);
                          toast.success("Added to Cart list", {
                            autoClose: 500,
                          });
                        } else {
                          toast.error("Error adding to Cart list");
                        }
                      }
                    } else {
                      toast.error(
                        "Please login to add to Cart list. Directing to login page..."
                      );

                      await new Promise((resolve) => setTimeout(resolve, 3000));

                      navigate("/login");
                    }
                  }}
                  loadingPosition="start"
                  loading={false}
                >
                  {isCart ? (
                    <CartIcon />
                  ) : (
                    <CartBorderOutlinedIcon />
                  )}
                </IconButton>

                <Button
                  variant="contained"
                  sx={{
                    width: { xs: "50%", md: "auto" },
                    backgroundColor: "darkred",
                  }}
                  startIcon={<PlayArrowIcon />}
                  size="large"
                  onClick={() => {
                    if (videoRef.current)
                      return videoRef.current.scrollIntoView();
                  }}
                >
                  Watch Trailer
                </Button>
              </Stack>
              <Container header={"Cast"}>
                {credits && (
                  <MediaSlider
                    mediaList={credits}
                    mediaType="person"
                  ></MediaSlider>
                )}
              </Container>
            </Stack>
          </Box>
        </Box>

        {/*action buttons*/}

        {/*Credits*/}
        {/* cast */}

        {/*Trailer*/}
        {/* {videos.length !== 0 && (
          <Box padding={4}>
            <Container header={"Videos"} padding="center">
              <VideosSlide videos={videos}></VideosSlide>
            </Container>
          </Box>
        )}} */}
        {(videos || backdrops || posters) &&
          (
            videos.length !== 0 ||
            backdrops.length !== 0 ||
            posters.length !== 0
          ) && (
            <Box padding={4}>
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="black"
                  indicatorColor="primary"
                  aria-label="secondary tabs example"
                  sx={{ marginBottom: "0px" }} // Thêm một khoảng cách dưới Tabs
                >
                  <Tab
                    value="zero"
                    label={
                      <Typography
                        variant="h5"
                        fontWeight="700"
                        text-decoration="underline"
                      >
                        MEDIAS
                      </Typography>
                    }
                    disabled="true"
                  />
                  <Tab
                    value="one"
                    label={
                      <Typography variant="h6" fontWeight="bold">
                        VIDEOS
                      </Typography>
                    }
                  />
                  <Tab
                    value="two"
                    label={
                      <Typography variant="h6" fontWeight="bold">
                        POSTERS
                      </Typography>
                    }
                  />
                  <Tab
                    value="three"
                    label={
                      <Typography variant="h6" fontWeight="bold">
                        BACKDROPS
                      </Typography>
                    }
                  />
                </Tabs>

                {value === "one" && videos && videos.length !== 0 && (
                  <div ref={videoRef}>
                    <Box padding={4}>
                      <VideosSlide videos={videos}></VideosSlide>
                    </Box>
                  </div>
                )}

                {value === "two" && posters && posters.length !== 0 && (
                  <Box padding={4}>
                    <PosterSlide posters={posters}></PosterSlide>
                  </Box>
                )}

                {value === "three" && backdrops && backdrops.length !== 0 && (
                  <Box padding={4}>
                    <BackdropSlide backdrops={backdrops}></BackdropSlide>
                  </Box>
                )}
              </Box>
            </Box>
          )}

        {/*Reviews*/}
        <Box padding={4}>
          <Container header={"Reviews"} padding="center">
            <Review movieId={movie.id}></Review>
          </Container>
        </Box>

        {similars.length !== 0 && (
          <Box padding={4}>
            <Container header={"You may also like"} padding="center">
              <MediaSlider mediaList={similars} mediaType="movie"></MediaSlider>
            </Container>
          </Box>
        )}
        <ToastContainer />
      </>
    )
  );
}
export default MovieDetail;
