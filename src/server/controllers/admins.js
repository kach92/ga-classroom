var sha256 = require('js-sha256');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (db) =>{

    const login = async (req,res) =>{

        if(sha256(req.body.password) === process.env.PASSWORD && req.body.email === process.env.EMAIL){
            res.cookie("session", sha256(process.env.SALT));
            res.send(true);
        }else{
            res.send(false);
        }
    }

    const salt = async (req,res) => {
        res.send({salt:process.env.SALT});
    }

    return {
        login,
        salt
    }
}