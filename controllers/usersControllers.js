const passwordHash = require('password-hash')
const models = require('../models/index')
const Petugas = models.petugas

login = async (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    const result = await Petugas.findOne({
        where: {
            username: username,
            active: true
        }
    });

    const akun = JSON.stringify(result)

    //Gagal Login
    if(JSON.parse(akun) == null){
        return res.json({
            login: false,
            akun: akun
        });
    }

    const cekPassword = passwordHash.verify(password, (JSON.parse(akun)).password)

    //Gagal Login
    if(cekPassword == false){
        return res.json({
            login: false,
            akun: akun
        });
    }

    return res.json({
        login: true,
        akun: akun
    }); 
}

logout = (req, res) => {

    console.log(req.session.akun)
}

module.exports = {
    login: login,
    logout: logout
}