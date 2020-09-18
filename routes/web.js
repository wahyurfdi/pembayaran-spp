const express = require('express')
const router = express.Router()
const pagesController = require('../controllers/pagesControllers')
const usersController = require('../controllers/usersControllers')
const jurusanController = require('../controllers/jurusanControllers')
const kelasController = require('../controllers/kelasControllers')
const sppController = require('../controllers/sppControllers')
const petugasController = require('../controllers/petugasControllers')
const siswaController = require('../controllers/siswaControllers')
const siswaSppController = require('../controllers/siswaSppControllers')
const transaksiController = require('../controllers/transaksiControllers')

router.get('/', pagesController.login)
router.post('/login', usersController.login)
router.get('/logout', usersController.logout)
router.get('/pages/beranda', isAuthenticated, pagesController.beranda)

router.get('/pages/pembayaran/transaksi', pagesController.pembayaran.cariTransaksi)
router.get('/pages/pembayaran/transaksi/bayar/:idSiswaSpp', pagesController.pembayaran.buatTransaksi)
router.get('/pembayaran', transaksiController.getPembayaran)
router.post('/pembayaran', transaksiController.postPembayaran)

router.get('/pages/pembayaran/riwayat', pagesController.pembayaran.riwayat)
router.get('/pages/pengumuman', pagesController.pengumuman.buatPengumuman)
router.get('/pages/pengumuman/:id_pengumuman', pagesController.pengumuman.detailPengumuman)

router.get('/pages/siswa', pagesController.siswa.inputSiswa)
router.get('/pages/siswa/:nisn', pagesController.siswa.detailSiswa)
router.get('/siswa', siswaController.getSiswa)
router.post('/siswa', siswaController.postSiswa)
router.put('/siswa/:nisn', siswaController.putSiswa)

router.get('/siswaspp/:nisn', siswaSppController.getSiswaSpp)
router.post('/siswaspp', siswaSppController.postSiswaSpp)
router.put('/siswaspp/:id_siswaSpp', siswaSppController.putSiswaSpp)

router.get('/pages/kelas', pagesController.kelas)
router.get('/kelas', kelasController.getKelas)
router.post('/kelas', kelasController.postKelas)
router.put('/kelas/:id_kelas', kelasController.putKelas)
router.delete('/kelas/:id_kelas', kelasController.deleteKelas)

router.get('/pages/jurusan', pagesController.jurusan)
router.get('/jurusan', jurusanController.getJurusan)
router.post('/jurusan', jurusanController.postJurusan)
router.put('/jurusan/:id_jurusan', jurusanController.putJurusan)
router.delete('/jurusan/:id_jurusan', jurusanController.deleteJurusan)

router.get('/pages/manajemen_spp', pagesController.spp)
router.get('/manajemen_spp', sppController.getSpp)
router.post('/manajemen_spp', sppController.postSpp)
router.put('/manajemen_spp/:id_spp', sppController.putSpp)
router.delete('/manajemen_spp/:id_spp', sppController.deleteSpp)

router.get('/pages/petugas', pagesController.petugas.inputPetugas)
router.get('/petugas', petugasController.getPetugas)
router.post('/petugas', petugasController.postPetugas)
router.put('/petugas/:id_petugas', petugasController.putPetugas)
router.delete('/petugas/:id_petugas', petugasController.deletePetugas)
router.get('/pages/petugas/:id_petugas', pagesController.petugas.detailPetugas)


//Cek login
function isAuthenticated(req, res, next){

    //req.cookies
    if(req.cookies['akun'] != null){
        return next();
    }

    res.redirect('/spp/');
}

module.exports = router