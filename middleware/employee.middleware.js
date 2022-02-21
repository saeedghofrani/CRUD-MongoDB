const validator = require('validator');
const Company = require('../model/company.model');
const companyValidator = async (req, res, next) => {
    let { Cname, registrationNumber, city, province, phoneNumber } = req.body;
    Cname = Cname.trim();
    registrationNumber = registrationNumber.trim();
    city = city.trim();
    province = province.trim();
    phoneNumber = phoneNumber.trim();
    res.locals = {
        error: false,
        errorMsg: []
    };
    if (!Cname || validator.isEmpty(Cname) || Cname.length < 2 || Cname.length > 30 || (await Company.find({ Cname: Cname })).length > 0) {
        res.locals.error = true;
        res.locals.errorMsg.push("Company name (unique!) is required (more than 2 letter and less than 30 letter)");
    }
    if (!registrationNumber || validator.isEmpty(registrationNumber) || registrationNumber.length !== 11 || (await Company.find({ registrationNumber: registrationNumber })).length > 0) {
        res.locals.error = true;
        res.locals.errorMsg.push("registration number (unique!) is required (contain 11 digit)");
    }
    if (!city || validator.isEmpty(city)) {
        res.locals.error = true;
        res.locals.errorMsg.push("city name is required ");
    }
    if (!province || validator.isEmpty(province)) {
        res.locals.error = true;
        res.locals.errorMsg.push("province is required ");
    }
    if (!phoneNumber || validator.isEmpty(phoneNumber) || !validator.isMobilePhone(phoneNumber) || (await Company.find({ phoneNumber: phoneNumber })).length > 0) {
        res.locals.error = true;
        res.locals.errorMsg.push("phone number (unique!) is required ");
    }
    next();
};
const updateCompanyValidator = async (req, res, next) => {
    //let { Cname, registrationNumber, city, province, phoneNumber } = req.body;
    res.locals = {
        error: false,
        errorMsg: []
    };
    if ('Cname' in req.body) {
        let { Cname } = req.body;
        Cname = Cname.trim();
        if (!Cname || validator.isEmpty(Cname) || Cname.length < 2 || Cname.length > 30 || (await Company.find({ Cname: Cname })).length > 0) {
            res.locals.error = true;
            res.locals.errorMsg.push("Company name (unique!) is required (more than 2 letter and less than 30 letter)");
        }
    }
    if ('registrationNumber' in req.body) {
        let { registrationNumber } = req.body;
        registrationNumber = registrationNumber.trim();
        if (!registrationNumber || validator.isEmpty(registrationNumber) || registrationNumber.length !== 11 || (await Company.find({ registrationNumber: registrationNumber })).length > 0) {
            res.locals.error = true;
            res.locals.errorMsg.push("registration number (unique!) is required (contain 11 digit)");
        }
    }
    if ('city' in req.body) {
        let { city } = req.body;
        city = city.trim();
        if (!city || validator.isEmpty(city)) {
            res.locals.error = true;
            res.locals.errorMsg.push("city name is required ");
        }
    }
    if ('province' in req.body) {
        let { province } = req.body;
        province = province.trim();
        if (!province || validator.isEmpty(province)) {
            res.locals.error = true;
            res.locals.errorMsg.push("province is required ");
        }
    }
    if ('phoneNumber' in req.body) {
        let { phoneNumber } = req.body;
        phoneNumber = phoneNumber.trim();
        if (!phoneNumber || validator.isEmpty(phoneNumber) || !validator.isMobilePhone(phoneNumber) || (await Company.find({ phoneNumber: phoneNumber })).length > 0) {
            res.locals.error = true;
            res.locals.errorMsg.push("phone number (unique!) is required ");
        }
    }
    next();
};
module.exports = { companyValidator, updateCompanyValidator };