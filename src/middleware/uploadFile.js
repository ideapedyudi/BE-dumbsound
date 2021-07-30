const multer = require('multer')

exports.uploadFile = (imageSong, fileSong) => {
    // init multer diskstorage
    // Menentukan destination file upload
    // Menentukan nama file (rename agar tidak ada file yang sama / ganda)

    const fileName = ""
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads") //Lokasi penyimpanan file
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ''))
        }
    })

    // function untuk filter file berdasarkan type
    const fileFilter = function (req, file, cb) {
        if (file.fieldname === imageSong) {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|mp3)$/)) {
                req.fileValidationError = {
                    message: "Only image files are allowed!"
                };
                return cb(new Error("Only image files are allowed!"), false);
            }
        }

        if (file.fieldname === fileSong) {
            if (!file.originalname.match(/\.(mp3)$/)) {
                req.fileValidationError = {
                    message: "Only video files are allowed!"
                };
                return cb(new Error("Only video files are allowed!"), false);
            }
        }
        cb(null, true)
    }

    const sizeInMB = 110000;
    const maxSize = sizeInMB * 110000 * 110000; //Maximum file size in MB

    // eksekusi upload multer dan menentukan disk storage, validation dan maxfile size
    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize
        }
    }).fields([
        {
            name: imageSong,
            maxCount: 1
        },
        {
            name: fileSong,
            maxCount: 1
        }
    ]); //untuk menentukan jumlah file

    return (req, res, next) => {
        upload(req, res, function (err) {
            // Pesan error jika validasi gagal
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError)
            }

            // Jika file upload tidak ada
            if (!req.files && !err) {
                return res.status(400).send({
                    message: "Please select files to upload"
                })
            }

            if (err) {
                // Jika size melebihi batas
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).send({
                        message: "Max file sized 100MB"
                    })
                }
                return res.status(400).send(err)
            }

            // Jika oke dan aman lanjut ke controller
            // Akses file yang di upload melalui req.files
            return next()
        })
    }
}