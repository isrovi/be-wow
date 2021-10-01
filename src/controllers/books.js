const { Books } = require('../../models'); 

exports.addBook = async (req, res) => {
    try {
      const data = req.body;
  
      const createdData = await Books.create(data);
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

exports.getBooks = async (req, res) => {
    try {
      const data = await Books.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
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

exports.getBook = async (req, res) => {
    try {
      const data = await Books.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
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

exports.updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
  
      await Books.update(newData, {
        where: {
          id,
        },
      });
  
      res.send({
        status: 'Success',
        message: `Book id: ${id} Updated`,
        data: newData,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };

exports.deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
  
      await Books.destroy({
        where: {
          id,
        },
      });
  
      res.send({
        status: 'Success',
        message: `User id: ${id} Deleted`,
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: 'failed',
        message: 'Server Error',
      });
    }
  };