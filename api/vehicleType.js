
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const VehicleType = require('../models/VehicleType')

router.get('/vehicleType', (req, res) => {
    VehicleType.query()
        .then(vehicle_type => {
            res.status(200).send(vehicle_type)
        })
})

router.get('/vehicleType/:id', (req, res) => {
    let id = parseInt(req.params.id)
    VehicleType.query()
        .where('id', id)
        .then(vehicle_type => {
            res.json(vehicle_type)
        })
})

  router.post('/vehicletype/add', (req, res) => {
    const { label } = req.body;
    if(label) {
      try{
        VehicleType.query().insert({
          label
        }).then(newItem => {
          return res.redirect('/api/vehicletype');
        });
      }
      catch(error) {
          console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
      }
    }
  })

  router.get("/vehicleType/delete/:Id", async (req,res) => {
    const vehicleType = await VehicleType.query().delete().where({'id': req.params.Id});
    return res.redirect("/api/vehicleType")
});


module.exports = {
    router: router
}

/* 

*/