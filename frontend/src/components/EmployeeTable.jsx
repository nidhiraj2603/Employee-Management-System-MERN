import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { getAllEmployees, deleteEmployee } from "../Redux/Slice/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EmployeeModal from "./EmployeeModal";
import CircularProgress from "@mui/material/CircularProgress";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderRight: `1px solid ${theme.palette.divider}`, // head cells right border
    borderBottom: `1px solid ${theme.palette.divider}`, // head cells bottom border
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: `1px solid ${theme.palette.divider}`, // body cells right border
    borderBottom: `1px solid ${theme.palette.divider}`, // body cells bottom border
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    borderBottom: `1px solid ${theme.palette.divider}`, // last row bottom border
  },
}));

export default function EmployeeTable() {
  const [open, setOpen] = React.useState({ id: null, isOpen: false, type: "" });
  const dispatch = useDispatch();

  const { employees, loading } = useSelector((state) => state.employeeReducer);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  const createHandler = () => {
    setOpen({ id: null, isOpen: true, type: "create" });
  };

  const viewHandler = (id) => {
    setOpen({ id: id, isOpen: true, type: "view" });
  };

  const editHandler = (id) => {
    setOpen({ id: id, isOpen: true, type: "edit" });
  };

  const deleteHandler = (id) => {
    dispatch(deleteEmployee(id));
    setOpen({ id: null, isOpen: false, type: "" });
  };

  return (
    <TableContainer component={Paper} sx={{ width: "80%", boxShadow: "none" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Button variant="contained" onClick={createHandler}>
          Add Employee
        </Button>
      </Box>

      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Employee Id</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Date Of Birth</StyledTableCell>
            <StyledTableCell align="right">Date Of Joining</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No Data Found
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <StyledTableRow key={employee._id}>
                <StyledTableCell component="th" scope="employee">
                  {employee.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {employee.contact}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {employee.email}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {employee.employeeId}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {employee.gender}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {employee.dateOfBirth}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {employee.dateOfJoining}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Button
                      variant="outlined"
                      onClick={() => viewHandler(employee._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => editHandler(employee._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => deleteHandler(employee._id)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>

      <EmployeeModal open={open} setOpen={setOpen} />
    </TableContainer>
  );
}
