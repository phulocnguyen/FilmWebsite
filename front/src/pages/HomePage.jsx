import React, { useEffect, useState } from "react";
import movieAPI from "../api/modules/movie.api.js";
import Container from "../components/common/Container.jsx";
import uiConfigs from "../configs/ui.configs.js";
import { Box, Stack, Typography } from "@mui/material";
import ImageHeader from "../components/common/ImageHeader";
import MediaSlider from "../components/common/MediaSlider.jsx";

function HomePage() {
  const [popularMovies, setPopularMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [mostPopularMovie, setMostPopularMovie] = useState(null);
  const webQuote = "Track films you’ve watched.\nSave those you want to see.\nTell your friends what’s good. "
  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularMoviesResponse = await movieAPI.getMovieList({
          movieType: "popular",
        });
        if (popularMoviesResponse.response) {
          const popularMoviesData = popularMoviesResponse.response.data.results;
          const top1 = popularMoviesData[0];
          setMostPopularMovie(top1);
          setPopularMovies(popularMoviesData);
        } else if (popularMoviesResponse.err) {
          console.error(
            "Error fetching popular movies:",
            popularMoviesResponse.err
          );
        }

        const topRatedMoviesResponse = await movieAPI.getMovieList({
          movieType: "top_rated",
        });
        if (topRatedMoviesResponse.response) {
          const topRatedMoviesData =
            topRatedMoviesResponse.response.data.results;
          setTopRatedMovies(topRatedMoviesData);
        } else if (topRatedMoviesResponse.err) {
          console.error(
            "Error fetching top rated movies:",
            topRatedMoviesResponse.err
          );
        }

        const upcomingMoviesResponse = await movieAPI.getMovieList({
          movieType: "upcoming",
        });
        if (upcomingMoviesResponse.response) {
          const upcomingMoviesData =
            upcomingMoviesResponse.response.data.results;
          setUpcomingMovies(upcomingMoviesData);
        } else if (upcomingMoviesResponse.err) {
          console.error(
            "Error fetching upcoming movies:",
            upcomingMoviesResponse.err
          );
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  let posterPath = "";
  let src = "";
  if (mostPopularMovie) {
    posterPath = mostPopularMovie.backdrop_path || mostPopularMovie.poster_path;
    src = posterPath
      ? `https://image.tmdb.org/t/p/original${posterPath}`
      : "/no_image.jpg";
  }

  return (
    <Box sx={{ width: "99%" }}>
      {mostPopularMovie && (
        <>
          <Box
            sx={{
               height: "100vh",
            }}
          >
            <ImageHeader imgPath={src} />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              marginTop: { xs: "-25rem", md: "-26.25rem", lg: "-33rem" },
            }}
          >
            <Box
              sx={{
                width: { xs: "3%", md: "2%" },
                height: "55vh",
                color: "text.primary",
              }}
            >
              <Typography
                variant="h4"
                fontSize={{ xs: "0.75rem", md: "1rem", lg: "1rem" }}
                fontWeight="700"
                sx={{
                  ...uiConfigs.style.typoLines(2, "left"),
                  writingMode: "vertical-rl",
                  margin: "0",
                  color: "rgba(20, 20, 20, 0.7)",
                }}
              >
                {`${mostPopularMovie.title || mostPopularMovie.name} ${
                  mostPopularMovie.release_date.split("-")[0]
                }`}
              </Typography>
            </Box>
            <Box
                sx={{
                  margin: { xs: "0 auto 2rem", md: "0 4rem 0 5rem" },
                  flexGrow:2,
                  color: "text.primary",
                }}
              >
                <Typography
                variant="h1"
                fontSize={{ xs: "2.2rem", md: "2.5rem", lg: "3rem" }}
                fontWeight="900"
                sx={{
                   ...uiConfigs.style.typoLines(3, "center"),
                  margin: "0",
                  color: "rgba(5, 5, 5)",
                  fontFamily: "'Times New Roman', sans-serif", // Sử dụng font 'Roboto'
                  whiteSpace: "pre-line", 
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)", // Bóng đổ
                  
                }}
              >
                {`${webQuote}`}
              </Typography>
               </Box>
          </Box>
        </>
      )}

      <Stack spacing={7} sx={{ margin: "0 0rem 0 2rem" }}>
        {popularMovies && (
          <Container header="popular movies">
            <MediaSlider mediaList={popularMovies} mediaType="movie" />
          </Container>
        )}
        {topRatedMovies && (
          <Container header="top-rated movies">
            <MediaSlider mediaList={topRatedMovies} mediaType="movie" />
          </Container>
        )}
        {upcomingMovies && (
          <Container header="upcoming movies">
            <MediaSlider mediaList={upcomingMovies} mediaType="movie" />
          </Container>
        )}
      </Stack>
    </Box>
  );
}

export default HomePage;
