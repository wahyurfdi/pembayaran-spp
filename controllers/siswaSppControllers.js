const models = require('../models/index')
const siswaSpp = models.siswaSPP
const Spp = models.spp

getSiswaSpp = async (req, res) => {
    const nisn = req.params.nisn

    siswaSpp.belongsTo(Spp, {foreignKey: 'id_spp'})

    const selectSiswaSpp = await siswaSpp.findAll({
        include: Spp,
        where: {
            nisn: nisn
        },
        order: [
            [Spp, 'tahun_ajaran', 'ASC']
        ]
    })

    res.send(selectSiswaSpp)
}

postSiswaSpp = async (req, res) => {
    const body = req.body
    const nisn = body.nisn
    const spp = body.spp

    for(var i=0;i<spp.length;i++){
        await siswaSpp.create({
            nisn: nisn,
            id_spp: spp[i],
            sisa_periode: 12,
            active: true
        })
    }
    
    res.send(true)
}

putSiswaSpp = async (req, res) => {
    const idSiswaSpp = req.params.id_siswaSpp
    const body = req.body
    const status = body.status

    const updateStatusSpp = await siswaSpp.update({
        active: status
    }, {
        where: {
            id_siswaSPP: idSiswaSpp
        }
    })

    if(updateStatusSpp != true){
        return res.send(false)
    }

    res.send(true)
}

module.exports = {
    getSiswaSpp: getSiswaSpp,
    postSiswaSpp: postSiswaSpp,
    putSiswaSpp: putSiswaSpp
}