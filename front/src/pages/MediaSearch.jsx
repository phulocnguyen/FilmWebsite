import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Stack,
  TextField,
  Toolbar,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import movieApi from "../api/modules/movie.api";
import MediaItem from "../components/common/MediaItem";
import uiConfigs from "../configs/ui.configs";
import Logo from "../components/common/Logo.jsx";
let timer;
const timeout = 500;
const skip = 12;
const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [isSearch, setIsSearch] = useState(false)
  const search = useCallback(async () => {
    setOnSearch(true);

    const { response, err } = await movieApi.search(query);
    setOnSearch(false);
    if (err) toast.error(err.message);
    if (response) {
      const filterMedias = response.data.results.filter(
        (media) => media.media_type != "tv"
      );
      const mediasSorted = filterMedias.sort(
        (a, b) => getReleaseDate(b) - getReleaseDate(a)
      );
      setMedias([...mediasSorted]);
      setFilteredMedias([...mediasSorted.slice(0, skip)]);
    }
  }, [query]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setFilteredMedias([]);
      setPage(1);
    } else search();
  }, [search, query]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, []);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);
    setIsSearch(false);
    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
    timer = setTimeout(() => {
      setIsSearch(true);
    }, timeout + 100);
  };

  const getReleaseDate = (movie) => {
    const date = new Date(movie.release_date);
    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Toolbar />
      <Box
        sx={{
          ...uiConfigs.style.mainContent,
          width: "100%",
          marginTop: "-2rem",
        }}
      >
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            alignContent="flex-start"
            sx={{ width: "100%" }}
          >
            <Logo />
          </Stack>
          <TextField
            color="success"
            placeholder="Search BMOVIE"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />

          <Grid container spacing={1}>
            {filteredMedias.map((media, index) => (
              <Grid item key={index} xs={4} sm={3} md={2}>
                <MediaItem media={media} mediaType={media.media_type} />
              </Grid>
            ))}
          </Grid>
          {query && !medias.length && isSearch && (
            <Stack>
              <Typography
                sx={{ ...uiConfigs.style.typoLines(2, "center"), fontStyle: "italic" }}
              >
                No matching results
              </Typography>
            </Stack>
          )}

          {filteredMedias.length < medias.length && (
            <LoadingButton loading={onSearch} onClick={onLoadMore}>
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
