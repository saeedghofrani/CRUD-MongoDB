const express = require('express');
const router = express.Router();
const { employeePageRender, deleteEmployee, createEmployee, updateEmployee } = require('../controller/employee.controller.js');
try {
    router.route('/')
        .get(employeePageRender)
        .post(createEmployee);
    router.route('/:nationalCode')
        .delete(deleteEmployee)
        .put(updateEmployee);
} catch (error) {
    console.log("database error" + error);
}
module.exports = router;
