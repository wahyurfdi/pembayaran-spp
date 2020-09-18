const models = require('../models/index')
const Siswa = models.siswa
const sppSiswa = models.siswaSPP
const Spp = models.spp
const Pembayaran = models.pembayaran
const Petugas = models.petugas

login = async (req, res) => {
    const body = req.body
    const nisn = body.nisn
    const nis = body.nis
    var error = '', code = '', message = ''

    const findSiswa = await Siswa.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            nisn: nisn,
            nis: nis
        }
    })

    if(findSiswa != null){
        error = false
        code = 200
        message = 'Berhasil login!'
    }else{
        error = true
        code = 404
        message = 'Gagal login!'
    }

    res.status(code).send({
        error: error,
        message: message,
        result: findSiswa
    })
}

getTagihanSpp = async (req, res) => {
    const nisn = req.params.nisn
    var error = false, code = 200, message = ''

    sppSiswa.belongsTo(Spp, {foreignKey: 'id_spp'})

    const selectTagihanSpp = await sppSiswa.findAll({
        include: [{
            model: Spp,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'active']
            }
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            nisn: nisn
        },
        order: [
            [Spp, 'tahun_ajaran', 'ASC']
        ]
    })

    if(selectTagihanSpp == null){
        message = "Data masih kosong"
    }
    
    message = "Berhasil load data"

    res.status(code).send({
        error: error,
        message: message,
        result: selectTagihanSpp
    })
}

getRiwayatPembayaran = async (req, res) => {
    const params = req.params
    const nisn = params.nisn
    const idSpp = params.idSpp

    const selectPembayaran = await Pembayaran.findAll({
        include: [{
            model: Petugas,
            as: 'petugas',
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'username', 'password']
            }
        }],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'arsip']
        },
        where: {
            nisn: nisn,
            id_spp: idSpp
        },
        order: [
            ['tgl_bayar', 'DESC']
        ]
    })

    res.status(200).send({
        error: false,
        message: "Berhasil load data",
        result: selectPembayaran
    })
}

module.exports = {
    login: login,
    getTagihanSpp: getTagihanSpp,
    getRiwayatPembayaran: getRiwayatPembayaran
}