const { history } = require('../../models')

exports.historys = async (req, res) => {
    try {
        const { body } = req

        await history.create(body)

        res.send({
            status: 'success',
            message: 'historytransaction Successfully Add'
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}

exports.getHistory = async (req, res) => {
    try {

        const { id } = req.params

        const historyData = await history.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: 'User Successfully Get Detail',
            data: {
                history: historyData
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