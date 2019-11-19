const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../env')

const RegisterUser = async function(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = await UserModel.create({
          ...req.body,
        });
        const token = jwt.sign({
          id: user._id
        }, env.JWT_SECRET, {
          expiresIn: '1h'
        });
        const result = user.toJSON();
        delete result['password'];
        res.status(200).json({
          status: 'success',
          data: {
            result: result,
            token
          }
        });
      } catch (err) {
        if (err.code === 11000) {
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

const LoginUser = async function (req, res) {
  try {
    const user = await UserModel.findOne({
      email: req.body.email
    }, '+password');
    if (!user) return res.status(404).json({
      status: 'not found',
      message: 'invalid password or email'
    });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) return res.status(401).json({
      status: 'error',
      message: 'invalid password or email'
    })

    const result = user.toJSON();
    delete result['password'];
    const token = jwt.sign({
      id: user.id
    }, env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.status(200).json({
      data: {
        result: result,
        token
      }
    })

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'server error occured'
    })
  }
}

const UserProfile = async function (req, res) {
  try {
    const user = await UserModel.findById(req.user)
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
module.exports = {
    RegisterUser,
    LoginUser,
    UserProfile
}