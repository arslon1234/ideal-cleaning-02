import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { Skeleton } from "@mui/material";
import edit from "../../assets/edit.svg";
import del from "../../assets/delete.svg";
import { TableProps } from "@global-interface";
import { useSearchParams } from "react-router-dom";
const GlobalTable = (props: TableProps) => {
    const [searchParams] = useSearchParams()
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get("limit")) || 10
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
            
                {props.headers?.map((header, index) => (
                  <TableCell key={index}>
                    <TableSortLabel>{header.title}</TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.isLoading
                ? Array.from(new Array(5)).map((_, index) => (
                    <TableRow key={index}>
                      {props.headers?.map((_, i) => (
                        <TableCell key={i}>
                          <Skeleton />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : props.body?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {page * limit - (limit - 1) + index}
                      </TableCell>
                      {props.headers?.map((header, i) => (
                        i >= 1 &&
                        <TableCell
                          key={i}
                          className={item[header.value]?.class}
                        >
                          {header.value === "action" ? (
                            <div className="flex gap-3 cursor-pointer items-center">
                              <img
                                src={del}
                                alt="delete"
                                onClick={() => props.deleteItem(item.id)}
                              />
                              <img
                                src={edit}
                                alt="edit"
                                onClick={() => props.editItem(item)}
                              />
                            </div>
                          ) : header.title === "Date" ? (<span>{item[header?.value].slice(0,10)}</span>) : item[header.value]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default GlobalTable;
