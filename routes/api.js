const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiControllers')

router.get('/', (req, res) => {
    res.send('ini routes api')
})

router.post('/login', apiController.login)
router.get('/tagihan-spp/:nisn', apiController.getTagihanSpp)   
router.get('/riwayat-pembayaran/:nisn/:idSpp', apiController.getRiwayatPembayaran)

module.exports = router