const { Users } = require('../../models');

const Joi = require('joi');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const schema = Joi.object({
      email: Joi.string().email().min(5).required(),
      password: Joi.string().min(5).required(),
    });
  
    const { error } = schema.validate(req.body);
  
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
      const isValid = await bcrypt.compare(req.body.password, userExist.password);
  
      if (!isValid) {
        return res.status(400).send({
          status: 'failed',
          message: 'Credential is invalid',
        });
      }
  
      const dataToken = {
        id: userExist.id,
      };
      
      const token = jwt.sign(dataToken, process.env.SECRET_KEY);
  
      res.status(200).send({
        status: 'Success',
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
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userExist = await Users.findOne({
      where: {
        email : req.body.email
      }
    });
    
    if (userExist) {
      return res.status(400).send({
        status: 'failed', 
        message: 'Email already exist'
      });
    }

    const newUser = await Users.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });

    res.status(200).send({
      status: 'Success',
      data: {
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role
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

