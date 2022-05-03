var database = require('../db_crud')
var {genJwt} = require('../util')
/* GET home page. */
async function login(req, res, next){
  try{
    if(req.body['username'] && req.body['password'])
    {
      let user = await database.loginUtenti(req.body['username'], req.body['password'])
      let notStudent = false;
      if(user[0].length <= 0){
        notStudent = true
        user = await database.loginDipendenti(req.body['username'], req.body['password'])
      }
      if(user){
        user = user[0][0]
        if(!notStudent){
          user['Ruolo'] = 2;
        }
      }
      let jwt = genJwt(user)
      res.json({token:jwt});
    }else{
      throw new Error();
    }
  } catch (ex) {
    console.log(ex);
    res.status(401).json({message:'authentication failed'});
  }
}

function get(req, res, next){
  try{
    database.getUser(req.params['idUser']).then((data)=>{
      res.json(data);
    })
  } catch (ex) {
    res.status(500).json({message:'internal error'});
  }
}

function del(req, res, next){
  try{
    database.deleteUser(req.params['userId']).then(data =>{
      res.json(data)
    })
  }catch(ex){
    res.status(500).json({message:'internal error'});
  }
}


module.exports = {
  login, get,del
}
