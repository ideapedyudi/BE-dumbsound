const { user, transaction } = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        res.send({
            status: 'success',
            message: 'User Successfully Get',
            data: {
                users
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

exports.getUser = async (req, res) => {
    try {

        const { id } = req.params

        const userData = await user.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: 'User Successfully Get Detail',
            data: {
                user: userData
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

exports.getUserTrans = async (req, res) => {
    try {

        const { id } = req.params

        const usertrans = await user.findOne({
            include: {
                model: transaction,
                as: 'transaction',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                // where: {
                //     transaction: {
                //         idActive: 0
                //     }
                // }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: 'User Successfully Get Detail',
            data: {
                user: usertrans
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