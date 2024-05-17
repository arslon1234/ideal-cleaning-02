import { useEffect, useState } from "react";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import { useLocation } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import {useOrderStore} from "@store";
import { Orders } from "@modals";
import { ToastContainer } from "react-toastify";
import GlobalTable from "@table";
import GlobalPagination from "@pagination";

const Index = () => {
  const { getData,data,isLoading,totalCount} = useOrderStore();
  const location = useLocation()
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const [params,setParams] = useState({
    limit: 10,
    page: 1,
  });
  useEffect(() => {
    getData(params);
  }, [params, getData]);
  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const page = params.get("page")
    const pageNumber = page ? parseInt(page) : 1
    setParams(prevParams =>({
      ...prevParams,
      page: pageNumber
    }))
    console.log(page)
  },[location.search])
  const headers = [
    { title: "№", value: "" },
    { title: "Mijoz ismi", value: "client_name" },
    { title: "Xizmat nomi", value: "service_name" },
    { title: "Price", value: "price" },
    { title: "Amount", value: "amount" },
    { title: "Status", value: "status" },
    { title: "Date", value: "created_at" },
    { title: "Action", value: "action" },
  ];
  const editItem =(item:any)=>{
    setModal(true)
    setItem(item)
  }
  const handleClose =()=>{
    setModal(false)
    setItem({})
  }
  const changePage = (value:number)=>{
    setParams(prevParams => ({
      ...prevParams,
      page: value
    }))
  }
  return (
    <>
      <ToastContainer />
      {modal && <Orders open={modal} handleClose={handleClose} item={item}/>}
      <div className="py-3 flex justify-between items-center">
        <div className="w-96">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Qidiruv"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModal(true)}
        >
          buyurtma qo'shish
        </Button>
      </div>
      <GlobalTable headers={headers} body={data} isLoading={isLoading}/>
      <GlobalPagination totalCount={totalCount} page={params.page} setParams={changePage}/>
    </>
  );
};

export default Index;
