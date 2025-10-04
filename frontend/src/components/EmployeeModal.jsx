import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployee, createEmployee } from "../Redux/Slice/employeeSlice";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function EmployeeModal({ open, setOpen }) {
  const handleClose = () => setOpen((prev) => ({ ...prev, isOpen: false }));
  const { employees, loading } = useSelector((state) => state.employeeReducer);

  React.useEffect(() => {
    if (open?.id && employees?.length > 0) {
      const found = employees.find((employee) => employee._id === open.id);
      setEmployeeData(found || {});
    }
  }, [open.id]);
  const [employeeData, setEmployeeData] = React.useState({});
  const dispatch = useDispatch();
  const editHandler = () => {
    const id = open.id;
    dispatch(updateEmployee({ id, employeeData }));
    setOpen((prev) => ({ ...prev, isOpen: false }));
  };
  const createHandler = () => {
    dispatch(createEmployee(employeeData));
    setOpen((prev) => ({ ...prev, isOpen: false, id: null }));
    setEmployeeData({});
  };
  return (
    <div>
      <Modal
        open={open.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              value={employeeData?.name}
              disabled={open.type === "view"}
              onChange={(e) =>
                setEmployeeData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Contact"
              variant="outlined"
              size="small"
              value={employeeData?.contact}
              disabled={open.type === "view"}
              onChange={(e) =>
                setEmployeeData((prev) => ({
                  ...prev,
                  contact: e.target.value,
                }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              value={employeeData?.email}
              disabled={open.type === "view"}
              onChange={(e) =>
                setEmployeeData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Gender"
              variant="outlined"
              size="small"
              value={employeeData?.gender}
              disabled={open.type === "view"}
              onChange={(e) =>
                setEmployeeData((prev) => ({ ...prev, gender: e.target.value }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Employee Id"
              variant="outlined"
              size="small"
              value={employeeData?.employeeId}
              disabled={open.type === "view"}
              onChange={(e) =>
                setEmployeeData((prev) => ({
                  ...prev,
                  employeeId: e.target.value,
                }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Date Of Birth"
              variant="outlined"
              size="small"
              value={employeeData?.dateOfBirth}
              disabled={open.type === "view"}
              onChange={(e) =>
                setEmployeeData((prev) => ({
                  ...prev,
                  dateOfBirth: e.target.value,
                }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Date Of Joining"
              variant="outlined"
              size="small"
              value={employeeData?.dateOfJoining}
              disabled={open.type === "view"}
              onChange={(e) =>
                setEmployeeData((prev) => ({
                  ...prev,
                  dateOfJoining: e.target.value,
                }))
              }
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                width: "100%",
                gap: "5px",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setOpen((prev) => ({ ...prev, isOpen: false }));
                }}
              >
                Close
              </Button>
              {open.type === "edit" && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={editHandler}
                  disabled={loading} // button disable during loading
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Save"
                  )}
                </Button>
              )}

              {open.type === "create" && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={createHandler}
                  disabled={loading} // button disable during loading
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Create"
                  )}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
