const models = require('../models/index')
const Spp = models.spp

getSpp = async (req, res) => {
    const status = req.query.status

    if(status != null || status != undefined){
        const getSpp = await Spp.findAll({
            where: {
                active: status
            },
            order: [
                ['tahun_ajaran', 'ASC']
            ]
        })

        return res.send(getSpp)
    }

    const getSpp = await Spp.findAll({
        order: [
            ['tahun_ajaran', 'DESC']
        ]
    })

    res.send(getSpp)
}

postSpp = async (req, res) => {
    const body = req.body
    const tahunAjaran = body.tahun_ajaran
    const nominal = body.nominal

    const insertSpp = await Spp.create({
        tahun_ajaran: tahunAjaran,
        nominal: nominal,
        active: true
    })

    if(JSON.stringify(insertSpp) != null){
        res.send(true)
    } else{
        res.send(false)
    }
}

putSpp = async (req, res) => {
    const idSpp = req.params.id_spp
    const body = req.body
    const tahunAjaran = body.tahunAjaran
    const status = body.status
    const nominal = body.nominal

    const updateSpp = await Spp.update({
        tahun_ajaran: tahunAjaran,
        nominal: nominal,
        active: status
    }, {
        where: {
            id_spp: idSpp
        }
    })

    if(JSON.stringify(updateSpp) != null){
        res.send(true)
    } else{
        res.send(false)
    }
}

deleteSpp = async (req, res) => {
    const idSpp = req.params.id_spp
    const deleteSpp = await Spp.destroy({
        where: {
            id_spp: idSpp
        }
    })

    if(deleteSpp != true){
        return res.send(false)
    }

    res.send(true)
}

module.exports = {
    getSpp: getSpp,
    postSpp: postSpp,
    putSpp: putSpp,
    deleteSpp: deleteSpp
}