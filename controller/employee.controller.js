const Employee = require('../model/employee.model');
const employeePageRender = async (request, response) => {
    Employee.find({}, function (err, result) {
        (err) ? response.render('error', { error: { message: "internal server error :" + err, statusCode: 500, } })
            : response.render('company', { data: result, error: "" });
    });
};
const deleteEmployee = async (request, response) => {
    // try {
    //     const nationalCode = request.params.nationalCode;
    //     let dletedCompany = await Employee.deleteOne({ nationalCode: nationalCode });
    //     const companies = await Employee.find({});
    //     return response.render('company', { data: companies, error: "" });
    // } catch (error) {
    //     return response.render('error', { error: { message: error, statusCode: 500 } });
    // }
    const nationalCode = request.params.nationalCode;
    let dletedCompany = await Employee.deleteOne({ nationalCode: nationalCode });
    dletedCompany !== 0 ? response.status(200).send('success') : response.status(500).send('internal server error');
};
const createEmployee = async (request, response) => {
    try {
        // let companies = await Company.find({});
        // if (response.locals.error) {
        //     return response.render('company', { data: companies, error: response.locals.errorMsg });
        // }
        const data = { firstName, lastName, city, nationalCode, gender, dateOfBirth } = request.body;
        const createdCompany = await Employee.create(data);
        let employees = await Employee.find({});
        return response.render('employee', { data: employees, error: "" });
    } catch (error) {
        return response.render('error', { error: { message: error, statusCode: 500 } });
    }
};
const updateEmployee = async (request, response) => {
    // if (response.locals.error) {
    //     return response.status(409).send({ error: response.locals.errorMsg });
    // }
    const nationalCode = request.params.nationalCode;
    // let targetUser = await Employee.findOne({ where: { nationalCode: nationalCode } });
    // if (!targetUser) {
    //     return response.status(404).send({ message: "employee not found." });
    // }
    const query = { nationalCode: nationalCode };
    Employee.findOneAndUpdate(query, request.body, (err, doc) => {
        if (err) {
            return response.status(500).send({ message: "internal server error" });
        }
    });
    return response.status(204).send('success');
};
module.exports = { employeePageRender, deleteEmployee, createEmployee, updateEmployee };