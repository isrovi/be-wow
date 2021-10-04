const { Transaction, Users } = require('../../models');

exports.addTransaction = async (req,res) => {
    try {
        const newTransaction = await Transaction.create({
            idUser: req.Users.id,
            transferProof: req.file.filename,
            remainingActive: 30,
            userStatus: "Active",
            paymentStatus: "Pending",
          });

        let data = await Transaction.findOne({
            where: {
                id: newTransaction.id
            },
            include: {
                model: Users,
                as: "User",
                attributes: {
                    exclude: ["email", "password", "role", "createdAt", "updatedAt"],
                },
            }
        });

        data = {
            ...data.dataValues,
            transferProof : process.env.FILE_PATH + data.transferProof
        }

        res.send({
            status : "Success",
            data : {
                data
            }
        });
    } catch (error) {
        console.log(error);
        res.send({
        status: "failed",
        message: "Server Error",
    });
    }
}

exports.updateTransaction = async (req,res) => {
    try {
        const { id } = req.params;
        await Transaction.update(req.body,{
            where: {
                id,
            },
        });

        let data = await Transaction.findOne({
            where: { 
                id
            },
            include: {
              model: Users,
              as: "User",
              attributes: {
                exclude: ["email", "password", "role", "createdAt", "updatedAt"],
              }
            },
            attributes: {
              exclude: ["idUser", "createdAt", "updatedAt"],
            }
          });

        data = {
            ...data.dataValues,
            transferProof: process.env.PATH_FILE + data.transferProof
        }

        res.send({
            status: "Success",
            data: {
              transaction: data,
            },
          });

    } catch (error) {
        console.log(error);
        res.send({
            status : "failed",
            message : "Server Error"
        });

    }
}

exports.getTransaction = async (req,res) => {
    try {
        const { id } = req.params;

        let data = await Transaction.findOne({
            where: {
                id
            },
            include: {
                model: Users,
                as: "User",
                attributes: {
                    exclude: ["email", "password", "role", "createdAt", "updatedAt"],
                }
            },
            attributes: {
                exclude: ["idUser", "createdAt", "updatedAt"],
            }
        });

        data = {
            ...data.dataValues,
            transferProof: process.env.PATH_FILE + data.transferProof
        }

        res.send({
            status : "Success",
            data : {
                transaction : data
            }
        });

    } catch (error) {
        console.log(error);
        res.send({
            status : "failed",
            message : "Server Error"
        });
    }
}

exports.getTransactions = async (req,res) => {
    try {
        let data = await Transaction.findAll({
            include: {
                model: Users,
                as: "User",
                attributes: {
                    exclude: ["email", "password", "role", "createdAt", "updatedAt"],
                },
            },
            attributes: {
                exclude: ["idUser", "createdAt", "updatedAt"],
            },
        });

        data = data.map(data => {
            return {
                ...data.dataValues,
                transferProof: process.env.PATH_FILE + data.transferProof
            }
        });

        res.send({
            status: "Success",
            data,
          });

    } catch (error) {
        console.log(error);
        res.send({
            status : "failed",
            message : "Server Error"
        });
    }
}