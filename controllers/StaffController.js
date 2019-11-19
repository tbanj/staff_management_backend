const StaffModel = require('../models/StaffModel');
class StaffController {
   async Create(req, res) {
       try {
           const newStaff = await StaffModel.create({
               ...req.body,
               userId: req.user
            });           
           res.status(200).json({status: 'success', data: newStaff});
       } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
              status: 'error',
              message: 'this email already exist'
            })
          } else {
            res.status(500).json({
              status: 'error',
              message: err,
            });
          }
       }
    }
    async UploadImg(req, res) {
        try {
            const id = req.staffId;
            const updatedStaff = await StaffModel.findByIdAndUpdate(id, {
                profilePic: req.imageUrl
            }, {new: true})
            res.status(200).json({status: 'success', data: updatedStaff});
        } catch (error) {
            res.status(500).json({status: 'error', msg: 'server error occured'})
        }
    }
    async Update(req, res) {
        try {
            const user = await StaffModel.findByIdAndUpdate(req.params.id, {
                ...req.body
            }, {new: true})
            if (!user) return res.status(404).json({
              status: 'bad input',
              message: 'user not found'
            });
            res.status(200).json({
              status: 'success',
              data: user
            })
          } catch (error) {
            res.status(500).json({
              status: 'error',
              message: 'server error'
            })
          }
    }
    async View(req, res) {
        try {
            const user = await StaffModel.findById(req.params.id)
            if (!user) return res.status(404).json({
              status: 'bad input',
              message: 'user not found'
            });
            res.status(200).json({
              status: 'success',
              data: user
            })
          } catch (error) {
            res.status(500).json({
              status: 'error',
              message: 'server error'
            })
          }
    }
}


module.exports = new StaffController;