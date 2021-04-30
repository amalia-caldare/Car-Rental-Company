
const express = require('express')
const { user } = require('../config/mysqlCredentials')
const router = express.Router()

const ContactInfo = require('../models/ContactInfo')

router.get('/contactInfo', (req, res) => {
    ContactInfo.query()
        .then(contact_info => {
            res.status(200).send(contact_info)
        })
})

router.get('/ContactInfo/:id', (req, res) => {
    let id = parseInt(req.params.id)
    ContactInfo.query()
        .where('id', id)
        .then(contact_info => {
            res.json(contact_info)
        })
})

  router.post('/contactinfo/add', (req, res) => {
    const { email, phoneNumber, openingTime, closingTime } = req.body;
    if(email && phoneNumber && openingTime && closingTime) {
      try{
        ContactInfo.query().insert({
          email,
          phoneNumber,
          openingTime,
          closingTime
          
        }).then(newItem => {
          return res.redirect('/api/contactInfo');
        });
      }
      catch(error) {
          console.log(error);
        return res.send({response: 'Something went wrong with the DB'});
      }
    }
  })

  router.get("/contactinfo/delete/:Id", async (req,res) => {
    const contactInfo = await ContactInfo.query().delete().where({'id': req.params.Id});
    return res.redirect("/api/contactInfo")
});


module.exports = {
    router: router
}

/* 
{
         "email":"email@gmail.com", 
         "phoneNumber":"+45 42338405", 
         "openingTime":"10:00", 
         "closingTime" :"17:30"
}
*/