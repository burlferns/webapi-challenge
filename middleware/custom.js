// Import database access
const pdb = require('../data/helpers/projectModel');
const adb = require('../data/helpers/actionModel');

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
// validateActId
// ********************************************************
function validateActId(req, res, next) {
  adb.get(req.params.id)
      .then(act=>{
        // console.log("In validateActId",act);
        if(act!==undefined) {
          req.act = act;
          next();
        }
        else {
          res.status(400).json({ message: "invalid action id" });
        }
      })
      .catch(err=>{
        console.log("Error in adb.get in validateActId");
        res.status(500)
          .json({error: "The action could not be accessed."});
      })
}


// ********************************************************
// validateActData
// ********************************************************
function validateActData(req, res, next) {
  const body = req.body;
    // console.log("In validateActData",body);
    if(Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing action data" });
    } 
    else if(!body.notes) {
      res.status(400).json({ message: "missing required notes field" });
    } 
    else if(!body.description) {
      res.status(400).json({ message: "missing required description field" });
    } 
    else {
      next();
    }
}

// ********************************************************
// validateActData_PrjID
// ********************************************************
function validateActData_PrjID(req, res, next) {
  const body = req.body;
    // console.log("In validateActData",body);
    if(Object.keys(body).length === 0) {
      res.status(400).json({ message: "missing action data" });
    } 
    else if(!body.project_id) {
      res.status(400).json({ message: "missing required project_id field" });
    } 
    else {
      pdb.get(body.project_id)
      .then(proj=>{
        // console.log("In validateActData_PrjID",proj);
        if(proj!==null) {
          next();
        }
        else {
          res.status(400).json({ message: "invalid project_id in body" });
        }
      })
      .catch(err=>{
        console.log("Error in pdb.get in validateActData_PrjID");
        res.status(500)
          .json({error: "The project could not be accessed."});
      })
    }
}





// ********************************************************
// ********************************************************
module.exports = {validatePrjId, validatePrjData, validateActId, validateActData, validateActData_PrjID};