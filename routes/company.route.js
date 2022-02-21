const express = require('express');
const router = express.Router();
const { companyPageRender, deleteCompany, createCompany, updateCompany, employeesCompany, companyAggrigation } = require('../controller/company.controller.js');
const { companyValidator, updateCompanyValidator } = require('../middleware/company.middleware');
router.route('/')
    .get(companyPageRender)
    .post(companyValidator, createCompany);
// router.route('/:Cname')
//     .get(employeesCompany)
//     .delete(deleteCompany)
//     .put(updateCompanyValidator, updateCompany);
router.route('/aggrigation')
    .get(companyAggrigation);

module.exports = router;