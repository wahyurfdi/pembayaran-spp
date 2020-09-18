const models = require('../models/index')
const Jurusan = models.jurusan

postJurusan = async (req, res) => {
    const body = req.body
    const jurusan = body.jurusan
    const keterangan = body.keterangan

    const insertJurusan = await Jurusan.create({
        nama_jurusan: jurusan,
        keterangan: keterangan,
        active: true
    })

    if(JSON.stringify(insertJurusan) != null){
        res.send(true)
    } else{
        res.send(false)
    }
}

getJurusan = async (req, res) => {
    const status = req.query.status
    const selectJurusanAll = await Jurusan.findAll({
        order: [
            ['id_jurusan', 'ASC']
        ]
    })

    if(status != null){
        const selectJurusanStatus = await Jurusan.findAll({
            where: {
                active: status
            },
            order: [
                ['id_jurusan', 'ASC']
            ]
        })

        return res.send(selectJurusanStatus)
    }
    
    res.send(selectJurusanAll)
}

deleteJurusan = async (req, res) => {
    const idJurusan = req.params.id_jurusan

    const hapusJurusan = await Jurusan.destroy({
        where: {
            id_jurusan: idJurusan
        }
    })

    if(hapusJurusan == true){
        res.send(true)
    } else{
        res.send(false)
    }
    
}

putJurusan = async (req, res) => {
    const idJurusan = req.params.id_jurusan
    const body = req.body
    const jurusan = body.jurusan
    const active = body.active
    const keterangan = body.keterangan

    const updateJurusan = await Jurusan.update({
        nama_jurusan: jurusan,
        keterangan: keterangan,
        active: active
    }, {
        where: {
            id_jurusan: idJurusan
        }
    });

    if(updateJurusan == false){
        res.send(false)
    }

    res.send(true)
}

module.exports = {
    postJurusan: postJurusan,
    getJurusan: getJurusan,
    deleteJurusan: deleteJurusan,
    putJurusan: putJurusan
}