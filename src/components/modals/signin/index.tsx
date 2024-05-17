import { ErrorMessage, Field, Formik, Form } from "formik";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import ChildModal from "./child-modal";
import {auth} from "@service";
import { verifyPassValidationSchema } from "@validation";
import { ModalProps } from "@global-interface";
import { ForgotPassword } from "@auth-interface";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function NestedModal({ open, handleClose }: ModalProps) {
  const [modal, setModal] = useState(false);
  const [email,setEmail] = useState("")
  const initialValues:ForgotPassword = {
    email: "",
  };
  const handleSubmit = async (values:ForgotPassword) => {
    setEmail(values.email)
    try{
        const response = await auth.forgot_password(values)
        response.status === 200 && setModal(true)
    }catch(error){
        console.log(error)
    }
  };
  return (
    <>
      <ChildModal open={modal} handleClose={() => setModal(false)} email={email}/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography
            id="keep-mounted-modal-title"
            className="text-center"
            variant="h6"
            component="h2"
          >
            Email kiriting
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={verifyPassValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
            <Field
              name="email"
              type="email"
              as={TextField}
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              helperText={
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-[red] text-[15px]"
                />
              }
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              submit
            </Button>
            </Form>
          </Formik>
         
        </Box>
      </Modal>
    </>
  );
}
