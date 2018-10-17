const express = require('express')
var rn = require('random-number');
const router = express.Router({mergeParams: true})
const dataStore = require('../../data/dataStore')

var gen = rn.generator({
  min:  100000
, max:  999999
, integer: true
})

let customers = [];

router.route('/customerInfo/:id')
  .get((req, res, next) => {
    res.send(JSON.stringify(getCustomerInfo(req.params.id)))
  })
  .post((req, res, next) => {
    res.send(JSON.stringify(saveCustomerInfo(req.body)))
  })

let getCustomerInfo = (id) => {
  console.log('Returning Customer #', id)
  return customers.find( x => x.id === id )
}

let saveCustomerInfo = (data) => {
  let customer = '';
  if(data.id !== ''){
    customer = customers.find( x => x.id === data.id);
  }else{
    customer = {};
    customer.quoteId = gen()
  }
  customer.firstName = data.firstName
  customer.lastName = data.lastName
  customer.dob = data.dob
  customer.stAddress = data.stAddr
  customer.apt = data.apt
  customer.zip = data.zipCode
  
  if(data.id === '') {
    customer.id = customers.length + 1
    customers.push(customer)
  }

  dataStore.addCustomer(customer)

  return { crn : customers.length, quoteid : customer.quoteId };
}

module.exports = router;