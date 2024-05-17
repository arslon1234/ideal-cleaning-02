import { ErrorMessage, Field, Form, Formik } from "formik";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { ModalProps } from "@global-interface";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { orderValidationSchema } from "@validation";
import { CreateOrder } from "@orders-interface";
import {useOrderStore, useServiceStore} from '@store'
import Notification from "@notification";
import { useEffect } from "react";
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
  const { createData } = useOrderStore();
  const { getData, data } = useServiceStore();
  useEffect(()=>{
    getData({page: 1, limit: 10})
  },[])
  console.log(item, 'modal')
  const initialValues: CreateOrder = {
    client_full_name: "",
    client_phone_number: "",
    service_id: "",
    amount: ""
  };
  const handleSubmit = async (values: CreateOrder) => {
    console.log(values)
    const status = await createData(values)
    console.log(status)
    // const payload = {
    //   ...values,
    //   price: Number(values.price),
    //   owner_id: getDataFromCookie("id"),
    // };
    // if(!item.id){
    // const status = await createData(payload);
    // if(status === 201){
    //     handleClose()
    // }else {
    //     Notification({title: "Nimadir xato", type: "error"})
    // }
    // }else {
    // await updateData({...payload, id: item.id})
    // }
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
          Buyurtmalar
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={orderValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="client_full_name"
                type="text"
                as={TextField}
                label="Mijoz ismini kiriting"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="client_full_name"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="client_phone_number"
                type="text"
                as={TextField}
                label="Mijoz telefon raqami"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="client_phone_number"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="service_id"
                type="text"
                as={Select}
                label="Mijoz telefon raqami"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="service_id"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              >
                {
                    data.map((item,index)=>(
                        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                    ))
                }
              </Field>
              <Field
                name="amount"
                type="number"
                as={TextField}
                label="Miqdorini kiriting"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="amount"
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
