import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uiConfigs from "../../configs/ui.configs";
import CircularRate from "./CircularRate";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    title: {
      fontSize: "2rem",
      fontWeight: "400",
      fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
    },
  },
});

const MediaItem = ({ media, mediaType }) => {
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rating, setRating] = useState(null);
  const [videosName, setVideosName] = useState(null);
  const [videosKey, setVideosKey] = useState(null);
  const [videosId, setVideosId] = useState(null);
  let src = "";
  useEffect(() => {
    setTitle(
      media.title
        ? media.title + " (" + media.release_date.split("-")[0] + ")"
        : media.name
    );
    setPosterPath(
      media.poster_path || media.backdrop_path || media.profile_path
    );
    if (mediaType === "movie") {
      setReleaseDate(media.release_date);
      setRating(media.vote_average);
    }
    if (mediaType === "videos") {
      setVideosId(media.id);
      setVideosName(media.name);
      setVideosKey(media.key);
    }
  }, [media, mediaType]);
  if (posterPath !== "") {
    src =
      (posterPath && `https://image.tmdb.org/t/p/original${posterPath}`) ||
      (mediaType === "movie" ? "/film.jpg" : "/actor.jpg");
  }
  return (
    <>
      {mediaType === "movie" && (
        <ThemeProvider theme={theme}>
          <Link to={`/movie/${media.id}`}>
            <Box
              title={title}
              sx={{
                ...uiConfigs.style.backgroundImage(src),
                paddingTop: "160%",
                height: "22.5vw",
                "&:hover .other-content": { opacity: 1, bottom: 0 },
                "&:hover .media-back-drop, &:hover .media-play-btn": {
                  opacity: 1,
                },
                "&:hover": { outline: "3px solid rgba(128, 128, 128, 0.8)" },
                color: "primary.contrastText",
                borderRadius: "5px",
              }}
            >
              <>
                <Box
                  className="media-back-drop"
                  sx={{
                    opacity: { xs: 1, md: 0 },
                    transition: "all 0.3s ease",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundImage:
                      "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
                  }}
                />
                <Box
                  className="media-info"
                  sx={{
                    transition: "all 0.3s ease",
                    position: "absolute",
                    opacity: 1,
                    bottom: 0,
                    bottom: { xs: 0, md: "-20px" },
                    width: "100%",
                    height: "max-content",
                    boxSizing: "border-box",
                    padding: { xs: "10px", md: "2rem 1rem" },
                  }}
                >
                  <Stack spacing={{ xs: 1, md: 2 }}>
                    <Box className="other-content" sx={{ opacity: 0 }}>
                      {rating > 0 && <CircularRate value={rating} />}
                    </Box>

                    <Typography className="other-content" sx={{ opacity: 0 }}>
                      {releaseDate}
                    </Typography>

                    <Typography
                      className="title"
                      variant="title"
                      fontWeight="700"
                      sx={{
                        fontSize: "1rem",
                        ...uiConfigs.style.typoLines(1, "left"),
                        opacity: 1,
                      }}
                    >
                      {title}
                    </Typography>
                  </Stack>
                </Box>
              </>
            </Box>
          </Link>
        </ThemeProvider>
      )}

      {mediaType === "person" && (
        <Link to={`/person/${media.id}`}>
          <Box
            sx={{
              ...uiConfigs.style.backgroundImage(src),
              paddingTop: "160%",
              "&:hover .media-info": { opacity: 1, bottom: 0 },
              "&:hover .media-back-drop, &:hover .media-play-btn": {
                opacity: 1,
              },
              color: "primary.contrastText",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "max-content",
                bottom: 0,
                padding: "10px",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
                {media.name}
              </Typography>
            </Box>
          </Box>
        </Link>
      )}
      {mediaType === "videos" && (
        <div
          key={videosId}
          style={{ flex: "0 0 auto", margin: "50px auto 10px auto" }}
        >
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videosKey}`}
            title={videosName}
            allowFullScreen
            style={{ width: "450px", height: "270px" }}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default MediaItem;
