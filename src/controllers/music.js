const { music, artis } = require('../../models')

exports.musics = async (req, res) => {
    try {
        const musics = await music.findAll({
            include: {
                model: artis,
                as: 'artis',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            attributes: {
                exclude: ['createdAt']
            },
            order: [['createdAt', 'DESC']],
        })

        res.send({
            status: 'success',
            message: 'User Successfully Get',
            data: {
                musics
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

exports.addMusic = async (req, res) => {
    try {
        const data = req.body;
        const thumbnail = req.files.imageSong[0].filename
        const attache = req.files.fileSong[0].filename

        const dataUpload = {
            ...data,
            thumbnail,
            attache
        }

        await music.create(dataUpload)

        res.send({
            status: 'success',
            message: 'Upload product data success'
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}
