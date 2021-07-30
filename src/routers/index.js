const express = require('express')

const router = express.Router()

// middleware
const { auth } = require('../middleware/auth')
const { uploadFile } = require('../middleware/uploadFile')
// const { uploadSong } = require('../middleware/uploadSong')

//================================== ROUTER REGISTER DAN LOGIN  ====================================
const { registrasi } = require('../controllers/register')

// router register
router.post('/register', registrasi)

// --------------------------- login -------------------------
const { login, checkAuth } = require('../controllers/login')

// router login
router.post('/login', login)

// auth
router.get("/check-auth", auth, checkAuth);

// -------------------------- music --------------------------
const { musics, addMusic } = require('../controllers/music')

// router menampikan data
router.get('/musics', musics)
router.post("/musics", uploadFile('imageSong', 'fileSong'), addMusic);

// ----------------------------- artis -----------------------------------
const { addArtis, getArtis } = require('../controllers/artis')

// router menampikan data
router.post('/artis', addArtis)

// get Artis
router.get('/artiss', getArtis)

// ----------------------------- users -----------------------------------
const { getUsers, getUser, getUserTrans } = require('../controllers/user')

// get User
router.get('/users', getUsers)

router.get("/user/:id", getUser);

router.get("/userTrans/:id", getUserTrans);

// ----------------------------- transaction -----------------------------------
const { addTransaction, getTrans, updateTrans, getTran, deleteTrans, editTransaction } = require('../controllers/transaction')

// router menampikan tambah data
router.post('/transaction', uploadFile('imageSong'), addTransaction)

// router edit data
router.patch('/transactionCancel/:id', uploadFile("imageSong"), editTransaction)

// get transactions
router.get('/transactions', getTrans)

router.patch("/transaction/:id", updateTrans);


// get transactions
router.get('/transaction/:id', getTran)

// get transactions
router.delete('/transaction/:id', deleteTrans)


// ----------------------------- hidtory -----------------------------------
const { historys, getHistory } = require('../controllers/history')

// router menampikan data
router.post('/history', historys)

// get transactions hostory
router.get('/history/:id', getHistory)


// ----------------------------- like -----------------------------------
const { likeById, likelike } = require('../controllers/like')

// router like
router.post('/like', auth, likelike)

// router like parameter
router.get('/like/:id', likeById)

// penutup router
module.exports = router