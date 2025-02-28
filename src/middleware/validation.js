
const { validationResult } = require("express-validator");

const validateRequestData = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    } else {
        return res.status(400).send({
            error: result.array()[0].msg
        });
    }
};

module.exports = validateRequestData;
