const models = require('../models/index')
const Siswa = models.siswa
const SiswaSpp = models.siswaSPP

getSiswa = async (req, res) => {
    const selectSiswa = await Siswa.findAll()
    
    res.send(JSON.stringify(selectSiswa))
}

postSiswa = async (req, res) => {
    const body = req.body
    const nisn = body.nisn
    const nis = body.nis
    const nama = body.nama
    const kelas = body.kelas
    const telepon = body.telepon
    const email = body.email
    const alamat = body.alamat
    const spp = body.spp
    
    const selectSiswa = await Siswa.findOne({
        where: {
            nisn: nisn
        }
    })

    if(selectSiswa != null){
        return res.send(false)
    }

    const insertSiswa = await Siswa.create({
        nisn: nisn,
        nis: nis,
        nama: nama,
        id_kelas: kelas,
        alamat: alamat,
        no_telp: telepon,
        email: email,
        active: true,
    })

    if(insertSiswa == null){
        return res.send(false)
    }

    for(var i=0;i<spp.length;i++){
        await SiswaSpp.create({
            nisn: insertSiswa.nisn,
            id_spp: spp[i],
            sisa_periode: 12,
            active: true,
        })
    }

    res.send(true)
}

putSiswa = async (req, res) => {
    const nisn = req.params.nisn
    const body = req.body
    const nis = body.nis
    const nama = body.nama
    const kelas = body.kelas
    const telepon = body.telepon
    const email = body.email
    const alamat = body.alamat
    const status = body.status

    const editSiswa = await Siswa.update({
        nis: nis,
        nama: nama,
        id_kelas: kelas,
        alamat: alamat,
        no_telp: telepon,
        email: email,
        active: status,
    }, {
        where: {
            nisn: nisn
        }
    })
    
    if(editSiswa != true){
        return res.send(false)
    }

    res.send(true)
}

module.exports = {
    getSiswa: getSiswa,
    postSiswa: postSiswa,
    putSiswa: putSiswa
}