import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Modal, Card, CardContent, CardHeader, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import QRCode from 'qrcode.react';
import accountApi from '../api/modules/account.api';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartMovies, totalPrice } = location.state;
  const [Cart, setCart] = useState(cartMovies);
  const [isCart, setIsCart] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

  const handleRemoveMovie = (movieId) => {
    const updatedCart = Cart.filter(movie => movie.id !== movieId);
    setCart(updatedCart);

    // Cập nhật state của giỏ hàng trong localStorage
    const updatedCartIds = updatedCart.map(movie => movie.id);
    localStorage.setItem('cart', JSON.stringify(updatedCartIds));

    // Cập nhật totalPrice ở đây nếu cần thiết, bằng cách tính lại từ updatedCart
  };

  const handleProceedToPayment = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const calculatePrice = (vote_average) => {
    if (vote_average <= 5) return 50000;
    if (vote_average <= 8) return 80000;
    return 100000;
  };

  const totalAmount = Cart.reduce((acc, movie) => acc + calculatePrice(movie.vote_average), 0);

  // Thông tin tài khoản để thanh toán
  const paymentInfo = {
    accountName: 'TRAN DUC DANG KHOI',
    accountNumber: '0378994318',
    bankName: 'MB Bank',
    totalAmount: totalAmount,
  };

  // Chuỗi thông tin thanh toán để mã hóa vào mã QR
  const qrValue = `Bank: ${paymentInfo.bankName}\nAccount Number: ${paymentInfo.accountNumber}\nAccount Name: ${paymentInfo.accountName}\nTotal Amount: ${paymentInfo.totalAmount} VND`;

  return (
    <Container>
      <Typography variant="h4" style={{ color: '#3f51b5', fontWeight: 'bold', textAlign: 'center', margin: '20px 0' }}>
        Checkout
      </Typography>
      <List>
        {Cart.map(movie => (
          <ListItem key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} style={{ width: '50px', height: 'auto' }} />
            <ListItemText
              primary={movie.title}
              secondary={`Review: ${movie.vote_average} - Price: ${calculatePrice(movie.vote_average)} VND`}
              style={{ marginLeft: '20px' }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveMovie(movie.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box mt={2}>
        <Typography variant="h6">
          Total Price: {totalAmount} VND
        </Typography>
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceedToPayment}
          style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px' }}
        >
          Proceed to Payment
        </Button>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
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
          <Card>
            <CardHeader title="Payment Information" />
            <Divider />
            <CardContent>
              <Typography variant="h6">
                Total Amount: {paymentInfo.totalAmount} VND
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Bank Name: {paymentInfo.bankName}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Account Holder: {paymentInfo.accountName}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Account Number: {paymentInfo.accountNumber}
              </Typography>
              <Box mt={2} display="flex" justifyContent="center">
                <QRCode value={qrValue} />
              </Box>
              <Button onClick={handleCloseModal} sx={{ mt: 2 }} fullWidth variant="contained" color="primary">
                Close
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;