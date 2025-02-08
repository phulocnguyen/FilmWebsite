import { Grid } from "@mui/material";
import MediaItem from "./MediaItem.jsx";

const MediaGrid = ({ mediaList, mediaType }) => {
  return (
    <>
      <Grid container spacing={1}>
        {mediaList.map((media, index) => (
          <Grid item key={index} xs={4} sm={3} md={2}>
            <MediaItem media={media} mediaType={mediaType} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MediaGrid;
