const express = require('express');
const router = express.Router();
const path = require('path');
const {getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployeebyId} = require('../../controllers/EmployeesController')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles');
router.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee);

router.route('/:id')
    .get(getEmployeebyId);
module.exports = router;