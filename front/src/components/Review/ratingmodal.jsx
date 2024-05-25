// RatingModal.jsx
import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Rating } from '@mui/material';

const RatingModal = ({ open, handleClose, handleSubmitRating }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = () => {
    handleSubmitRating(rating);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="rating-modal-title"
      aria-describedby="rating-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="rating-modal-title" variant="h6" component="h2">
          Rate the Movie
        </Typography>
        <Rating
          name="movie-rating"
          value={rating}
          onChange={handleRatingChange}
          precision={0.5}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Rating
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RatingModal;