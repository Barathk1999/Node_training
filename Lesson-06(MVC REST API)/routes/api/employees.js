const express = require('express');
const router = express.Router();
const path = require('path');
const {getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployeebyId} = require('../../controllers/EmployeesController')

router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

router.route('/:id')
    .get(getEmployeebyId);
module.exports = router;