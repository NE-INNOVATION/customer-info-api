const express = require('express')
const router = express.Router({mergeParams: true})

let customers = [];

router.route('/customerInfo/:id')
  .get((req, res, next) => {
    res.send(JSON.stringify(getCustomerInfo(req.params.id)))
  })
  .post((req, res, next) => {
    res.send(JSON.stringify({result : saveCustomerInfo(req.body)}))
  })

let getCustomerInfo = (id) => {
  console.log('Returning Customer #', id)
  return customers.find( x => x.id === id )
}

let saveCustomerInfo = (data) => {
  let customer = '';
  if(data.id !== ''){
    customer = customers.find( x => x.id === data.id );
  }else{
    customer = {};
  }
  // customer.id = customers.length + 1,
  customer.firstName = data.firstName
  customer.lastName = data.lastName
  customer.dob = data.dob
  customer.stAddress = data.stAddress
  customer.apt = data.apt
  customer.zip = data.zipCode
  
  if(data.id === '') {
    customer.id = customers.length + 1
    customers.push(customer)
  }

  return customers.length;
}

module.exports = router;