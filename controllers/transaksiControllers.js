const models = require('../models/index')
const Pembayaran = models.pembayaran
const Spp = models.spp

getPembayaran = async (req, res) => {
    Pembayaran.belongsTo(Spp, {foreignKey: 'id_spp'})
    const selectPembayaran = await Pembayaran.findAll({
        include: Spp
    })

    res.send(selectPembayaran)
}

postPembayaran = async (req, res) => {
    const body = req.body
    const idPetugas = body.petugas
    const idSpp = body.id_spp
    const nisn = body.nisn
    const tglBayar = body.tgl_bayar
    const periode = body.periode_pembayaran
    const totalBayar = body.jumlah_bayar

    const insertPembayaran = await Pembayaran.create({
        id_petugas: idPetugas,
        id_spp: idSpp,
        nisn: nisn,
        tgl_bayar: tglBayar,
        periode_pembayaran: periode,
        jumlah_pembayaran: totalBayar,
        arsip: false
    })

    if(insertPembayaran == null){
        return res.send(false)
    }

    res.send(true)
}

module.exports = {
    getPembayaran: getPembayaran,
    postPembayaran: postPembayaran
}