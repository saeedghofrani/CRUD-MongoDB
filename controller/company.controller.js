const Company = require('../model/company.model');
const Employee = require('../model/employee.model');
const companyPageRender = (_request, response) => {
    Company.find({}, function (err, result) {
        (err) ? response.render('error', { error: { message: "internal server error :" + err, statusCode: 500, } })
            : response.render('company', { data: result, error: "" });
    });
};
const deleteCompany = async (request, response) => {
    const Cname = request.params.Cname;
    let dletedCompany = await Company.deleteOne({ Cname: Cname });
    dletedCompany.deletedCount !== 0 ? response.status(200).send('success') : response.status(500).send('internal server error');
};
const createCompany = async (request, response) => {
    try {
        let companies = await Company.find({});
        if (response.locals.error) {
            return response.render('company', { data: companies, error: response.locals.errorMsg });
        }
        const data = { Cname, registrationNumber, city, province, phoneNumber } = request.body;
        await Company.create(data);
        response.redirect('/company');
    } catch (error) {
        return response.render('error', { error: { message: error, statusCode: 500 } });
    }
};
const updateCompany = async (request, response) => {
    const Cnamequery = request.params.Cname;
    const companyQuery = { Cname: Cnamequery };
    if (response.locals.error) {
        console.log(response.locals.errorMsg);
        return response.status(409).send({ error: response.locals.errorMsg });
    }
    if ("Cname" in request.body) {
        const { Cname } = request.body;
        const employeeQuery = { company: Cnamequery };
        Employee.updateMany(employeeQuery, { $set: { company: Cname } }, (err, doc) => {
            if (err) {
                return response.status(500).send({ message: "internal server error" });
            }
        });
    }
    Company.findOneAndUpdate(companyQuery, request.body, (err, doc) => {
        if (err) {
            return response.status(500).send({ message: "internal server error" });
        }
        return response.status(204).send('success');
    });
};
const employeesCompany = async (request, response) => {
    const Cname = request.params.Cname;
    const companyEmployees = await Employee.find({ company: Cname });
    Employee.find({ company: Cname }, function (err, result) {
        (err) ? response.render('error', { error: { message: "internal server error :" + err, statusCode: 500, } })
            : response.render('employee', { data: companyEmployees, error: "" });
    });
};
const companyAggrigation = (request, response) => {
    const targetCompany = Company.aggregate([
        { $group: { name: "$Cname" } },
        { $project: { isExpired: { $cond: { if: { $gt: ["$createdAt", (new Date().getFullYear()) - 1] }, then: "No", else: "Yes" } }, } }
    ]);
    console.log(targetCompany);
};
module.exports = { companyPageRender, deleteCompany, createCompany, updateCompany, employeesCompany, companyAggrigation };