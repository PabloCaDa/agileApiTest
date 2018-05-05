const USERModel = require('./users.model')
const JAPI = require('../services/jsonapi')
const crypto = require('crypto');
const _ = require('lodash')
const {PATH} = require('./constants')


module.exports = {
    getAll : getAll,
    getByID : getByID,
    create : create,
    deleteByID : deleteByID,
    updateByID : updateByID
}

function getAll(req,res){

    let toFront={};
    let page = JAPI.getPage(req.query.page);
    let offset = JAPI.getOffset(req.query.offset)

    USERModel.find().
        then(response => {

            let division = _.chunk(response,offset)
            toFront.data = JAPI.createJAR('users', division[page-1])
            toFront.links = JAPI.createLinks(page,offset,division,req);
            toFront.numberOfPages = division.length;
            res.send(toFront);

        }) 
        .catch((err) => res.json(err))
}

module.exports.getAll.blueprint = `
## GET ${PATH}/     or     ${PATH}?pages=number&offset=number
+ Request (application/json)
  + Query Parameters
    + pages (number) - Current page
       Default: 1
    + offset (number) - Number of costumers per page
       Default: 10
+ Response 200 (application/json)
  + Body
    {
      data: {
        type: 'users',
        attributes: [{
          _id: '545362362',
          username: 'StanL',
          name: 'Stan',
          surname: 'Lee',
          password: '111',
          admin: true
        }]
      },
      links: { self: 'Link', prev: 'Link', next: 'Link', first: 'link', last: 'link' },
      numberOfPages: 1
    }
`

function getByID(req,res){

    USERModel.findById(req.params.id).
        then(response => res.json(JAPI.createJAR('user',response,response._id)))
        .catch(err => res.sendStatus(404))
}

module.exports.getByID.blueprint = `
## GET ${PATH}/:id
+ Response 200 (application/json)
  {
    data: {
        type: 'user',
        attributes: {
          _id: '545362362',
          username: 'StanL',
          name: 'Stan',
          surname: 'Lee',
          password: '111',
          admin: true
        },
        id: '545362362'
  }
`

function create(req,res){

    const newUser = req.body;
    newUser.password = crypto.createHash('sha256').update(newUser.password).digest('hex');

    USERModel.create(newUser).
        then(response => res.send(JAPI.createJAR('user', response, response._id)))
        .catch(err => res.json(err))

}

module.exports.create.blueprint = `
## POST ${PATH}/
+ Request (application/json)
  + Body
    {
        username: 'StanL',
        name: 'Stan',
        surname: 'Lee',
        password: '111',
        admin: true
    }
+ Response 201 (application/json)
{
    data: {
        type: 'user',
        attributes: {
          _id: '545362362',
          username: 'StanL',
          name: 'Stan',
          surname: 'Lee',
          password: '111',
          admin: true
        },
        id: '545362362'
  }
`

function deleteByID(req,res){

    USERModel.findById(req.params.id)
        .then(response => {           
            response.remove();
            res.sendStatus(204);
        })
        .catch(err => res.sendStatus(404))

}

module.exports.deleteByID.blueprint = `
## DELETE ${PATH}/:id
+ Response 204 (application/json)
`

function updateByID(req,res){

    let config = { new: true, runValidators: true };

    USERModel.findOneAndUpdate({_id: req.params.id}, req.body, config)
        .then(updated => res.send(JAPI.createJAR('user', updated, updated._id)))
        .catch(err => res.json(err))
}

module.exports.updateByID.blueprint = `
## PATCH ${PATH}/:id
+ Request (application/json)

    Any field to update

+ Response 200 (application/json)
{
    data: {
        type: 'user',
        attributes: {
          _id: '545362362',
          username: 'StanL',
          name: 'Stan',
          surname: 'Lee',
          password: '111',
          admin: true
        },
        id: '545362362'
  }

  *This is the resource with the new information updated
`

