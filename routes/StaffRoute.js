const express = require('express');
const StaffController = require('../controllers/StaffController');
const JoiValidator = require('../middlewares/validator');
const AuthMiddleWare = require('../middlewares/auth');
const {CreateStaffValidator} = require('../validations/StaffValidation');
const cloudHelper = require('../helpers/Cloudinary');


const router = express.Router()

router.post('/create' , AuthMiddleWare, JoiValidator(CreateStaffValidator), StaffController.Create)
router.post('/upload-pics', cloudHelper.uploader, StaffController.UploadImg)
router.get('/view/:id', StaffController.View)
router.patch('/update/:id', JoiValidator(CreateStaffValidator), StaffController.Update)
module.exports = router;