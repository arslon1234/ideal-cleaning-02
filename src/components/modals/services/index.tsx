import { ErrorMessage, Field, Form, Formik } from "formik";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { ModalProps } from "@global-interface";
import { Button } from "@mui/material";
import { serviceValidationSchema } from "@validation";
import { CreateService } from "@services-interface";
import useServiceStore from "../../../store/service";
import { getDataFromCookie } from "@data-service";
import Notification from "@notification";
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

const Index = ({ open, handleClose, item }: ModalProps) => {
  const { createData,updateData } = useServiceStore();
  console.log(item, 'modal')
  const initialValues: CreateService = {
    name: item.name || "",
    price: item.price || "",
  };
  const handleSubmit = async (values: CreateService) => {
    console.log(values)
    const payload = {
      ...values,
      price: Number(values.price),
      owner_id: getDataFromCookie("id"),
    };
    if(!item.id){
    const status = await createData(payload);
    if(status === 201){
        handleClose()
    }else {
        Notification({title: "Nimadir xato", type: "error"})
    }
    }else {
    await updateData({...payload, id: item.id})
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
          Services
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={serviceValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="name"
                type="text"
                as={TextField}
                label="Xizmat nomini kiriting"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="price"
                type="text"
                as={TextField}
                label="Xizmat narxini kiriting"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="price"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default Index;
