// there is nothing in this file right now!
const {check, validationResult} = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
          .array()
          .map((error) => error.msg);
        const err = Error("Bad request!");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad Request.";
        return next(err);
    }
    next();
}

module.exports = handleValidationErrors

const taskValidators = [
    check('detail')
        .exists({checkFalsy: true})
        .withMessage('Task details are required'),
    check('priority')
        .exists({checkFalsy: true})
        .withMessage('Must set task to complete or incomplete'),
];

const listValidators = [
    check('name')
      .exists({checkFalsy: true})
      .withMessage("Lists must have a name"),
]

module.exports = { taskValidators, listValidators, handleValidationErrors };
