
import React from 'react';
import { Avatar, Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import TextAvatar from './TextAvatar';
import reviewApi from '../../api/modules/review.api';
import movieApi from "../../api/modules/movie.api.js";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ReviewItem = ({ review, onRemoved }) => {
    const [onRequest, setOnRequest] = useState(false);
    const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;


  const user = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;


  const username = user ? JSON.parse(user).username : "null";
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    
    // const onRemoved = (id) => {
    //     console.log("id", id);
    // };
    const onRemove = async () => {
        setOnRequest(true);
        const response = await reviewApi.deleteReview(review._id, token);
        console.log("response", response);
        console.log("response sucess", response.success);
        if (response.success) {
            // toast.success("Review deleted successfully");
            // navigate(`/movie/${movieId}`);
            onRemoved(review._id);
            setOnRequest(false);
        } else {
            toast.error("Failed to delete review");
            console.log(response.err);
            setOnRequest(false);
        }
    };

    return (
        
        <Box sx={{
            padding: 2,
            borderRadius: "5px",
            position: "relative",
            opacity: 1,
            "&:hover": { backgroundColor: "lightgray" }
        }}>
            <Stack direction="row" spacing={2}>
                <TextAvatar text={review.username} />
                <Stack spacing={2} flexGrow={1}>
                    <Stack spacing={1}>
                        <Typography variant="h6" fontWeight="700">
                            {review.username}
                        </Typography>
                        <Typography variant="caption">
                        {dayjs(review.created_at).format("DD-MM-YYYY HH:mm:ss")}
                        </Typography>
                    </Stack>
                    <Typography variant="body1" textAlign="justify">
                        {review.text}
                    </Typography>
                   {username === review.username && (
                    <LoadingButton
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onRemove}
                    sx={{
                      position: { xs: "relative", md: "absolute" },
                      right: { xs: 0, md: "10px" },
                      marginTop: { xs: 2, md: 0 },
                      width: "max-content"
                    }}
                  >
                    remove
                  </LoadingButton>
                )
                    }

                </Stack>
            </Stack>
        </Box>
    );
}

export default ReviewItem;
