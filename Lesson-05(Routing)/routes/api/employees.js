const express = require('express');
const router = express.Router();
const path = require('path');

const data = {};

data.employees = require('../../data/employees.json');

router.route('/')
    .get((req,res)=> {
        res.json(data.employees);
    })
    .post((req,res) => {
        res.json({
            "id": req.body.id,
            "Employee_name": req.body.Employee_name,
            "Salary": req.body.Salary
        });
    })
    .put((req, res) => {
        res.json({
            "id": req.body.id,
            "Employee_name": req.body.Employee_name,
            "Salary": req.body.Salary
        })
    })
    .delete((req, res) => {
        res.json({"id":req.body.id})
    });

router.route('/:id')
    .get((req, res) => {
        res.json({"id": req.params.id})
    });
module.exports = router;