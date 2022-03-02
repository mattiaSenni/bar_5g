var database = require('../db_crud')
var {genJwt} = require('../util')
/* GET home page. */
function login(req, res, next){
  try{
    if(req.body['username'] && req.body['password'])
    {
      let user = database.login(req.body['username'], req.body['password'])
      let jwt = genJwt(user)
      res.json(jwt);
    }else{
      throw new Error();
    }
  }catch(ex){
    res.status(401).json({message:'authentication failed'});
  }
}



module.exports = {
  login
}
