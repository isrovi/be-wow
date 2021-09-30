const { Users } = require('../../models');

exports.addUser = async (req, res) => {
  try {
    const data = req.body;

    const createdData = await Users.create(data);
    res.send({
      status: 'Success',
      data: createdData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const data = await Users.findAll({
      attributes: {
        exclude: ['password', 'role', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'Success',
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'role', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'Success',
      data: {
        user: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await Users.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: 'Success',
      message: `User id: ${id} deleted`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};