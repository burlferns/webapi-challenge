// Import Express and external middleware
const express = require('express');

// Import Express middleware
const router = express.Router();

// Import database access
const adb = require('../data/helpers/actionModel');

//Import custom middleware
const {validateActId, validateActData, validateActData_PrjID} = require('../middleware/custom');

// ********************************************************
// GET /acts
// ********************************************************
router.get('/', (req, res) => {
  adb.get()
    .then(acts=>{
      // console.log("In GET /acts",acts);
      res.status(200).json(acts);
    })
    .catch(err=>{
      console.log("Error in adb.get in GET /acts");
      res.status(500)
        .json({error: "Information on actions could not be retrieved."});
    })
}); 


// ********************************************************
// GET /acts/:id
// ********************************************************
router.get('/:id', validateActId, (req, res) => {
  res.status(200).json(req.act);
});

// ********************************************************
// PUT /acts/:id
// ********************************************************
router.put('/:id', validateActId, validateActData, validateActData_PrjID, (req, res) => {
  adb.update(req.params.id,req.body)
    .then(act=>{
      // console.log("In PUT /acts/:id",act);
      if(act!==null) {
        res.status(200).json(act);
      }
      else {
        res.status(400).json({ message: "invalid action id" });
      }
    })
    .catch(err=>{
      console.log("Error in adb.update in PUT /acts/:id");
      res.status(500)
        .json({error: "Action could not be updated."});
    });
  });

// ********************************************************
// DELETE /acts/:id
// ********************************************************
router.delete('/:id', validateActId, (req, res) => {
  adb.remove(req.params.id)
    .then(count=>{
      console.log(count);
      if(count===1) {
          res.status(200).json(`Action with id ${req.params.id} has been deleted`);
      }
      else {
          console.log("Error in adb.remove in DELETE /acts/:id");
          res.status(500)
          .json({error: "Action could not be deleted."});
      }
    })
    .catch(err=>{
      console.log("Error in adb.remove in DELETE /posts/:id");
      res.status(500)
          .json({error: "Action could not be deleted."});
    })
});
  














// ********************************************************
// ********************************************************
module.exports = router;