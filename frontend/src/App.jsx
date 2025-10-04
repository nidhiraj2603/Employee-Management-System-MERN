import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import EmployeeTable from "./components/EmployeeTable";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "700",
            textAlign: "center",
            background: "linear-gradient(90deg, #1976d2, #42a5f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Employee Management
          <Box
            sx={{
              width: 80,
              height: 4,
              bgcolor: "#1976d2",
              margin: "8px auto 0 auto",
              borderRadius: 2,
            }}
          />
        </Typography>
        <EmployeeTable />
      </Box>
    </>
  );
}

export default App;
