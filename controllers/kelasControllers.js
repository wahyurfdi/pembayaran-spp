const models = require('../models/index')
const Kelas = models.kelas
const Jurusan = models.jurusan

getKelas = async (req, res) => {

    var selectKelasAll = await Kelas.findAll({
        include: Jurusan
    })

    res.send(selectKelasAll)
}

postKelas = async (req, res) => {
    const body = req.body
    const kelas = body.kelas
    const jurusan = body.jurusan

    var insertKelas = await Kelas.create({
        kelas: kelas,
        id_jurusan: jurusan,
        active: true
    })

    if(JSON.stringify(insertKelas) != null){
        res.send(true)
    } else{
        res.send(false)
    }
}

putKelas = async (req, res) => {
    const idKelas = req.params.id_kelas
    const body = req.body
    const kelas = body.kelas
    const idJurusan = body.jurusan
    const active = body.active

    console.log(idKelas)

    const updateKelas = await Kelas.update({
        kelas: kelas,
        id_jurusan: idJurusan,
        active: active
    }, {
        where: {
            id_kelas: idKelas
        }
    })

    if(updateKelas == false){
        res.send(false)
    }

    res.send(true)
}

deleteKelas = async (req, res) => {
    const idKelas = req.params.id_kelas

    const deleteKelas = await Kelas.destroy({
        where: {
            id_kelas: idKelas
        }
    })

    if(deleteKelas == false){
        return res.send(false)
    }

    res.send(true)
}

module.exports = {
    getKelas: getKelas,
    postKelas: postKelas,
    putKelas: putKelas,
    deleteKelas: deleteKelas
}