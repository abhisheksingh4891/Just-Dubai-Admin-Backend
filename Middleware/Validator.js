const { body } = require('express-validator');

const adminValidationRules = () => {
  return [
    body('first').notEmpty().withMessage('First name is required'),
    body('last').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('phone').isNumeric().withMessage('Phone number must be a number'),
    body('designation').notEmpty().withMessage('Designation is required'),
    body('empId').isNumeric().withMessage('Employee ID must be a number').isLength({ min: 4, max: 4 }).withMessage('Employee ID must be exactly 4 digits long'),
  ];
};

module.exports = 
  adminValidationRules
;
