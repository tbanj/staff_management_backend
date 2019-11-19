const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }, 
    dob: {
        type: Date,
        required: true
    },
    stateOfOrigin: {
        type: String,
        required: true,
      },
    profilePic: {
        type: String,
        default: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg'
      },
      userId: {
        type: String,
        required: true,
      }

})
const StaffModel = mongoose.model('staff', StaffSchema)
module.exports = StaffModel;