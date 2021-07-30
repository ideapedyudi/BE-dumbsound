// memanggil model tabel database
const { like, music } = require('../../models')

// joi
const joi = require('joi')

// ================================================= like ===========================================
exports.likelike = async (req, res) => {
    try {
        // token
        const { idUser } = req

        // mendapatkan data body
        const { id } = req.body

        // cek inputan
        const schema = joi.object({
            id: joi.number().required()
        }).validate(req.body)


        // jika tidak memebuhi
        if (schema.error) {
            return res.send({
                status: 'validation failed',
                message: schema.error.details[0].message
            })
        }

        // mengecek apakah id ada di feed
        const checkId = await music.findOne({
            where: {
                id
            }
        })

        // mencari id ada atau tidak
        if (!checkId) {
            return res.send({
                status: 'failed',
                message: "id feed not found"
            })
        }

        // cek jika udah like atau belum
        const check = await like.findOne({
            where: {
                idUser: idUser,
                idMusic: id
            }
        })

        // ketika cek id 
        if (check) {
            await like.destroy({ where: { idMusic: id, idUser: idUser } })
            // cek if feed
            const datas = await music.findOne({
                where: {
                    id
                }
            })

            // menambhkan 1 dan update like feed
            const likes = datas.like - 1
            await music.update({ like: likes }, {
                where: {
                    id
                }
            })

            res.send({
                status: 'success',
                id
            })
        } else {
            // cek if feed
            const data = await music.findOne({
                where: {
                    id
                }
            })

            // tambahkan data ke like
            await like.create({
                idMusic: id,
                idUser: idUser
            })

            // menambhkan 1 dan update like feed
            const likes = data.like += 1
            await music.update({ like: likes }, {
                where: {
                    id
                }
            })

            res.send({
                status: 'success',
                id
            })
        }


        // tampil ketika server error
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// --------------------- id like ----------------------
exports.likeById = async (req, res) => {
    try {

        const { id } = req.params

        const likes = await like.findAll({
            where: {
                idUser: id
            }
        })

        if (!likes) {
            return res.send({
                status: 'failed',
                message: 'No Likes'
            })
        }

        res.send({
            status: 'success',
            like: likes
        })


    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}
