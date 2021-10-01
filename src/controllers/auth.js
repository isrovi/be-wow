const { Users } = require('../../models');

const Joi = require('joi');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    // our validation schema here
    const schema = Joi.object({
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(6).required(),
    });
  
    // do validation and get error object from schema.validate
    const { error } = schema.validate(req.body);
  
    // if error exist send validation error message
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
  
    try {
      const userExist = await Users.findOne({
        where: {
          email: req.body.email,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      // compare password between entered from client and from database
      const isValid = await bcrypt.compare(req.body.password, userExist.password);
  
      // check if not valid then return response with status 400 (bad request)
      if (!isValid) {
        return res.status(400).send({
          status: 'failed',
          message: 'credential is invalid',
        });
      }
  
      const dataToken = {
        id: userExist.id,
      };
      const SECRET_KEY = '543'; 
      const token = jwt.sign(dataToken, SECRET_KEY);
  
      res.status(200).send({
        status: 'success...',
        data: {
          fullName: userExist.fullName,
          email: userExist.email,
          token,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };

exports.register = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
    fullName: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    // we generate salt (random value) with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // we hash password from request with salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await Users.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });

    // code here

    res.status(200).send({
      status: 'success...',
      data: {
        fullName: newUser.fullName,
        email: newUser.email,
        // code here
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

