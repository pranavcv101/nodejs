import express from "express";
import Employee from "./entities/employee.entity";
import datasource  from "./db/data-source";
import { Entity } from "typeorm";
const employeeRouter = express.Router();



employeeRouter.get("/", async (req, res) => {
  const employeeRepository  =  datasource.getRepository(Employee);

  const employees = await employeeRepository.find();

  res.status(200).send(employees);

});

employeeRouter.get("/:id",async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository  =  datasource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({id:empId})

  if (!employee) {
    res.status(404).send("Employee not found");
    return;
  }
  res.status(200).send(employee);
});



employeeRouter.post("/", async (req, res) => {
  console.log(req.body);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  const employeeRepository  =  datasource.getRepository(Employee);
  const employee = await employeeRepository.insert(newEmployee)
  // console.log(`hello this is te new employeeee ${employee}`)
  res.status(200).send(newEmployee);
});

employeeRouter.delete("/:id",  async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee)
  employeeRepository.delete({id:Number(req.params["id"])})
  // const employeeIdxToDelete = employees.findIndex(
  //   (emp) => emp.id === Number(req.params["id"]),
  // );
  // employees.splice(employeeIdxToDelete, 1);
  res.status(200).send();
});

employeeRouter.put("/:id", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee)
  const empId = Number(req.params["id"])
  await employeeRepository.update({id:empId},req.body)
  console.log("update employees");
  res.status(200).send(await employeeRepository.findOneBy({id:empId}));
});


export default employeeRouter;
