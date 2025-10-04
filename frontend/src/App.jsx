import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import EmployeeTable from "./components/EmployeeTable";
import Button from "@mui/material/Button";

function App() {
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <EmployeeTable />
      </Box>
    </>
  );
}

export default App;
