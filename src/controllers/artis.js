const { artis } = require('../../models')

exports.addArtis = async (req, res) => {
    try {
        const { body } = req

        const artisData = await artis.create(body)

        res.send({
            status: 'success',
            message: 'artis Successfully Add',
            data: artisData
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}


exports.getArtis = async (req, res) => {
    try {
        const artiss = await artis.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        res.send({
            status: 'success',
            message: 'User Successfully Get',
            data: {
                artiss
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