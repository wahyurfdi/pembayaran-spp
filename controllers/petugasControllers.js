const passwordHash = require('password-hash')
const sequelize = require('sequelize')
const op = sequelize.Op
const models = require('../models/index')
const Petugas = models.petugas

getPetugas = async (req, res) => {
    const akun = JSON.parse(req.cookies['akun'])
    const selectPetugas = await Petugas.findAll({
        where: {
            id_petugas: {
                [op.ne]: akun.id_petugas 
            }
        }
    })

    res.send(selectPetugas)
}

postPetugas = async (req, res) => {
    const body = req.body
    const nama = body.nama
    const username = body.username
    const password = passwordHash.generate(body.password)
    const role = body.role
    const active = body.active

    const insertPetugas = await Petugas.create({
        nama_petugas: nama,
        username: username,
        password: password,
        roles: role,
        active: active,
    })

    if(insertPetugas == null){
        return res.send(false)
    }

    res.send(true)
}

putPetugas = async (req, res) => {
    const idPetugas = req.params.id_petugas
    const body = req.body
    const nama = body.nama
    const username = body.username
    const password = passwordHash.generate(body.password)
    const role = body.role
    const active = body.status

    const updatePetugas = await Petugas.update({
        nama_petugas: nama,
        username: username,
        password: password,
        roles: role,
        active: active,
    }, {
        where: {
            id_petugas: idPetugas
        }
    })

    if(updatePetugas != true){
        return res.send(false)
    }

    res.send(true)
}

deletePetugas = async (req, res) => {
    const idPetugas = req.params.id_petugas
    const deletePetugas = await Petugas.destroy({
        where: {
            id_petugas: idPetugas
        }
    })

    if(deletePetugas != true){
        return res.send(false)
    }

    res.send(true)
}

module.exports = {
    getPetugas: getPetugas,
    postPetugas: postPetugas,
    putPetugas: putPetugas,
    deletePetugas: deletePetugas
}