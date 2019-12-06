// Import database access
const pdb = require('../data/helpers/projectModel');

// ********************************************************
// validatePrjId
// ********************************************************
function validatePrjId(req, res, next) {
  pdb.get(req.params.id)
      .then(proj=>{
        // console.log("In validatePrjId",proj);
        if(proj!==null) {
          req.proj = proj;
          next();
        }
        else {
          res.status(400).json({ message: "invalid project id" });
        }
      })
      .catch(err=>{
        console.log("Error in pdb.get in validatePrjId");
        res.status(500)
          .json({error: "The project could not be accessed."});
      })
}


// ********************************************************
// validatePrjData
// ********************************************************
function validatePrjData(req, res, next) {
  const body = req.body;
    // console.log("In validatePrjData",body);
    if(Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing project data" });
    } 
    else if(!body.name) {
      res.status(400).json({ message: "missing required name field" });
    } 
    else if(!body.description) {
      res.status(400).json({ message: "missing required description field" });
    } 
    else {
      next();
    }
}





// ********************************************************
// ********************************************************
module.exports = {validatePrjId, validatePrjData};