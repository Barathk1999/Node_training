const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  const Employees = await Employee.find();
  if(!Employees) return res.status(204).json({'message': 'No employees found'});
  res.json(Employees);
};

const createNewEmployee = async (req, res) => {
  if(!req?.body?.Employee_name || !req?.body?.Salary) {
    return res.status(400).json({'message': 'Employee name and Salary are required'}); }
  
    try{
      const result = await Employee.create({
        Employee_name: req.body.Employee_name,
        Salary: req.body.Salary
      });
      res.status(201).json(result)
    } catch (err) {
      console.error(err);
    }
};

const updateEmployee = async (req, res) => {
  if(!req?.body?.id){
    return res.status(400).json({'message': 'ID parameter is required.'});
  }
  const employee = await Employee.findOne({_id: req.body.id}).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.Employee_name) employee.Employee_name = req.body.Employee_name;
  if (req.body.Salary) employee.Salary = req.body.Salary;
  const result = await employee.save();
  res.status(200).json(result);
};

const deleteEmployee = async (req, res) => {
  if(!req?.body?.id) return res.status(400).json({'message': 'ID parameter is required.'})
  const employee = await Employee.findOne({_id: req.body.id}).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const result = await employee.deleteOne({_id: req.body.id});
  res.json(result);
};

const getEmployeebyId = async (req, res) => {
  if(!req?.params?.id) return res.status(400).json({'message': 'ID parameter is required.'});
  const employee = await Employee.findOne({_id: req.params.id}).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeebyId,
};
