const models = require('../models/index')
const Siswa = models.siswa
const SiswaSpp = models.siswaSPP
const Spp = models.spp
const Petugas = models.petugas
const Kelas = models.kelas
const Jurusan = models.jurusan

pageLogin = (req, res) => {
    res.render('pages/index')
}

pageBeranda = async (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])

    const countSiswa = await Siswa.count()
    const countPetugas = await Petugas.count()
    const countKelas = await Kelas.count()
    const countJurusan = await Jurusan.count()


    res.render('pages/beranda', {
        page: 'beranda',
        akun: akun,
        dashboard: {
            siswa: countSiswa,
            petugas: countPetugas,
            kelas: countKelas,
            jurusan: countJurusan
        }
    })
}

pageCariTransaksi = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])

    res.render('pages/pembayaran/cari_transaksi', {
        page: 'cari_transaksi',
        akun: akun
    })
}

pageBuatTransaksi = async (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])
    const id_siswaSPP = req.params.idSiswaSpp

    SiswaSpp.belongsTo(Spp, {foreignKey: 'id_spp'})

    const selectSppSiswa = await SiswaSpp.findOne({
        include: Spp,
        where: {
            id_siswaSPP: id_siswaSPP
        }
    })

    const selectSiswa = await Siswa.findOne({
        where: {
            nisn: selectSppSiswa.nisn
        }
    })

    res.render('pages/pembayaran/buat_transaksi', {
        page: 'cari_transaksi',
        akun: akun,
        siswa: selectSiswa,
        spp_siswa: selectSppSiswa
    })
}

pageRiwayat = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])

    res.render('pages/pembayaran/riwayat', {
        page: 'riwayat',
        akun: akun
    })
}

pagePengumuman = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])
    
    res.render('pages/pengumuman/buat_pengumuman', {
        page: 'pengumuman',
        akun: akun
    })
}

pageDetailPengumuman = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])
    
    res.render('pages/pengumuman/detail_pengumuman', {
        page: 'pengumuman',
        akun: akun
    })
}

pageInputSiswa = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])

    res.render('pages/siswa/input_siswa', {
        page: 'siswa',
        akun: akun
    })
}

pageDetailSiswa = async (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])
    const nisn = req.params.nisn

    Siswa.belongsToMany(Spp, {
        through: SiswaSpp,
        foreignKey: 'nisn'
    })

    Spp.belongsToMany(Siswa, {
        through: SiswaSpp,
        foreignKey: 'id_spp'
    })

    const selectSiswa = await Siswa.findOne({
        include: Spp,
        where: {
            nisn: nisn
        }
    })

    res.render('pages/siswa/detail_siswa', {
        page: 'siswa',
        akun: akun,
        siswa: JSON.parse(JSON.stringify(selectSiswa))
    })
}

pageKelas = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])

    res.render('pages/kelas', {
        page: 'kelas',
        akun: akun
    })
}

pageJurusan = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])

    res.render('pages/jurusan', {
        page: 'jurusan',
        akun: akun
    })
}

pageSPP = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])

    res.render('pages/spp', {
        page: 'spp',
        akun: akun
    })
}

pageInputPetugas = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])

    res.render('pages/petugas/input_petugas', {
        page: 'petugas',
        akun: akun
    })
}   

pageDetailPetugas = (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])

    res.render('pages/petugas/detail_petugas', {
        page: 'petugas',
        akun: akun
    })
}

module.exports = {
    login: pageLogin,
    beranda: pageBeranda,
    pembayaran: {
        cariTransaksi: pageCariTransaksi,
        buatTransaksi: pageBuatTransaksi,
        riwayat: pageRiwayat
    },
    pengumuman: {
        buatPengumuman: pagePengumuman,
        detailPengumuman: pageDetailPengumuman
    },
    siswa: {
        inputSiswa: pageInputSiswa,
        detailSiswa: pageDetailSiswa
    },
    kelas: pageKelas,
    jurusan: pageJurusan,
    spp: pageSPP,
    petugas: {
        inputPetugas: pageInputPetugas,
        detailPetugas: pageDetailPetugas
    }
}