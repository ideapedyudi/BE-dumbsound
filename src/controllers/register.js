// memanggil model tabel database
const { user } = require('../../models')

// joi
const joi = require('joi')

// bcrypt
const bcrypt = require('bcrypt')

// jwt
const jwt = require('jsonwebtoken')

// registrasi
exports.registrasi = async (req, res) => {
    try {

        const { email, password } = req.body
        const data = req.body

        // skema pengecekan inputan
        const schema = joi.object({
            email: joi.string().email().min(6).required(),
            password: joi.string().min(6).required(),
            fullName: joi.string().min(3).required(),
            level: joi.string().min(1).required(),
            gender: joi.string().min(3).required(),
            phone: joi.string().min(12).required(),
            address: joi.string().min(12).required(),
            image: joi.string().min(6).required(),

        })

        // jika validasi tidak memenuhi
        const { error } = schema.validate(data)

        // jika tidak memebuhi
        if (error) {
            return res.send({
                status: 'Validation Faileds',
                message: error.details[0].message
            })
        }

        // mengecek apakah email sudah terdaftar atau belum
        const checkEmail = await user.findOne({
            where: {
                email
            }
        })

        // mencari emaail ada atau tidak
        if (checkEmail) {
            return res.send({
                status: 'Failed',
                message: 'Email Already Registered'
            })
        }


        // bcrypt email enkripsi password
        const hashStrenght = 10
        const hashhedPassword = await bcrypt.hash(password, hashStrenght)

        // masukkan ke  database
        const dataUser = await user.create({
            ...data,
            password: hashhedPassword
        })

        // membuat token
        const secretKey = process.env.SECRET_KEY

        // tokennya
        const token = jwt.sign({
            id: dataUser.id
        }, secretKey)

        // jika berhasil pengecekan
        res.send({
            status: 'success',
            message: 'successfully registered please login',
            data: {
                user: {
                    email: dataUser.email,
                    fullName: dataUser.fullName,
                    level: dataUser.level,
                    id: dataUser.id,
                    token
                }
            }
        })

        // letika server error
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error'
        })
    }
}