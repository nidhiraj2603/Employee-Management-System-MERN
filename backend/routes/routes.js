const express = require("express");

const Router = express.Router();

const EmployeeModel = require("../models/employee");

Router.get("/employee", async (req, res) => {
  try {
    const employee = await EmployeeModel.find();
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error });
  }
});

Router.post("/employee", async (req, res) => {
  try {
    console.log(req.body);
    const employee = new EmployeeModel(req.body);
    const saveEmployee = await employee.save();
    res.status(201).json(saveEmployee);
  } catch (error) {
    res.status(400).json({ message: "Error creating Employee", error: error });
  }
});

Router.put("/employee/:id", async (req, res) => {
  try {
    const updatedEmpolyee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedEmpolyee) {
      return res.status(404).json({ message: "employee not found" });
    }
    //IF EMPLOYEE IS FOUND
    res.status(200).json(updatedEmpolyee);
  } catch (error) {
    res.status(400).json({ message: "Error updating employee", error: error });
  }
});

Router.delete("/employee/:id", async (req, res) => {
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(
      req.params.id
    );
    //IF EMPLOYEE NOT FOUND
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }
    res.status(200).json({ message: "employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error: error });
  }
});

module.exports = Router;
