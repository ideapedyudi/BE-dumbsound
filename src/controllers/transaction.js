const { transaction, user } = require('../../models')

exports.addTransaction = async (req, res) => {
    try {
        const data = req.body;
        const attache = req.files.imageSong[0].filename

        const dataUpload = {
            ...data,
            attache
        }

        await transaction.create(dataUpload)

        res.send({
            status: 'success',
            message: 'Upload historytransaction data success'
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

// ================================================= edit data ==============================================
exports.editTransaction = async (req, res) => {
    try {

        // id mana yang ingin kita update
        const { id } = req.params

        // data body
        const data = req.body;
        const attache = req.files.imageSong[0].filename

        const dataUpload = {
            ...data,
            attache
        }

        // proses update
        await transaction.update(dataUpload,
            {
                where: {
                    userId: id
                }
            })

        // berhasil
        res.send({
            status: 'success',
        })
        // error server
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getTrans = async (req, res) => {
    try {
        const transactions = await transaction.findAll({
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            order: [['id', 'DESC']],
        })

        res.send({
            status: 'success',
            message: 'User Successfully Get',
            data: {
                transactions
            }
        })
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

exports.updateTrans = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req

        const checkId = await transaction.findOne({
            where: {
                id
            }
        })

        // check id user
        if (!checkId) {
            return res.send({
                status: 'failed',
                message: `User with id: ${id} not found`
            })
        }

        // Proses update
        await transaction.update(body,
            {
                where: {
                    id
                }
            })

        const dataUpdate = await transaction.findOne(
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    id
                }
            })

        res.send({
            status: 'success',
            message: 'transaction Successfully Add',
            data: {
                transaction: dataUpdate
            }
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

exports.getTran = async (req, res) => {
    try {

        const { id } = req.params

        const transactionData = await transaction.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: 'transaction Successfully Get Detail',
            data: {
                transaction: transactionData
            }
        })
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}


exports.deleteTrans = async (req, res) => {
    try {
        const { id } = req.params

        await transaction.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: 'transaction successfully Delete',
            data: {
                id
            }
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}