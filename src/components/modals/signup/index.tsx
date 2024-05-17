import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalProps } from "@global-interface";
import { auth } from "@service";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
interface IModalProp extends ModalProps {
  email: string;
}
const Index = ({ open, handleClose, email }: IModalProp) => {
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(60);
  useEffect(() => {
    let timer = null;
    if (open) {
      timer = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open]);
  useEffect(() => {
    // If the timer reaches 0, close the modal
    if (secondsLeft === 0) {
      handleClose();
    }
  }, [secondsLeft, handleClose]);
  const navigate = useNavigate();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = { code, email };
      const response = auth.auth_verify(payload);
      console.log(response);
      if (response.status === 201) {
        navigate("/singin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="keep-mounted-modal-title"
          className="text-center"
          variant="h6"
          component="h2"
        >
          Parolni kiriting
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Parolni kiriting"
            id="fullWidth"
            sx={{ marginY: "20px" }}
            onChange={(e) => setCode(e.target.value)}
          />
          <Typography variant="body1" component="p" className="my-4">
            {`Time left: ${secondsLeft} seconds`}
          </Typography>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Index;
