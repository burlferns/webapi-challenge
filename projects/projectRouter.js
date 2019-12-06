// Import Express and external middleware
const express = require('express');

// Import Express middleware
const router = express.Router();

// Import database access
const pdb = require('../data/helpers/projectModel');


//Import custom middleware
const {validatePrjId, validatePrjData} = require('../middleware/custom');

// ********************************************************
// GET /projs
// ********************************************************
router.get('/', (req, res) => {
  pdb.get()
    .then(projs=>{
      // console.log("In GET /projs",projs);
      res.status(200).json(projs);
    })
    .catch(err=>{
      console.log("Error in pdb.get in GET /projs");
      res.status(500)
        .json({error: "Information on projects could not be retrieved."});
    })
}); 


// ********************************************************
// GET /projs/:id
// ********************************************************
router.get('/:id', validatePrjId, (req, res) => {
  res.status(200).json(req.proj);
});


// ********************************************************
// POST /projs
// ********************************************************
router.post('/', validatePrjData, (req, res) => {
  pdb.insert(req.body)
  .then(proj=>{
    // console.log("In POST /projs",proj);
    res.status(200).json(proj);
  })
  .catch(err=>{
    console.log("Error in pdb.insert in POST /projs");
    res.status(500)
      .json({error: "Could not add new project to database."});
  })
});


// ********************************************************
// PUT /projs/:id
// ********************************************************
router.put('/:id', validatePrjId, validatePrjData, (req, res) => {
  pdb.update(req.params.id,req.body)
    .then(proj=>{
      // console.log("In PUT /projs/:id",proj);
      if(proj!==null) {
        res.status(200).json(proj);
      }
      else {
        res.status(400).json({ message: "invalid project id" });
      }
    })
    .catch(err=>{
      console.log("Error in pdb.update in PUT /projs/:id");
      res.status(500)
        .json({error: "Project could not be updated."});
    });
});


// ********************************************************
// DELETE /projs/:id
// ********************************************************
router.delete('/:id', validatePrjId, (req, res) => {
  pdb.remove(req.params.id)
    .then(count=>{
      // console.log("In DELETE /projs/:id",count);
      if(count===1) {
        res.status(200).json(`Project with id ${req.params.id} has been deleted`);
      }
      else {
        console.log("Error in pdb.remove in DELETE /projs/:id");
        res.status(500)
          .json({error: "Project could not be deleted."});
      }
    })
    .catch(err=>{
      console.log("Error in pdb.remove in DELETE /projs/:id");
      res.status(500)
        .json({error: "Project could not be deleted."});
    });
});





// ********************************************************
// ********************************************************
module.exports = router;