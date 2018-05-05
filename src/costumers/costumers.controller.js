const COSTUMERModel = require('./costumers.model')
const JAPI = require('../services/jsonapi')
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

    COSTUMERModel.find().
        then(response => {

            let division = _.chunk(response,offset)
            console.log(division.length)
            toFront.data = JAPI.createJAR('costumers', division[page-1])
            toFront.links = JAPI.createLinks(page,offset,division,req);
            toFront.numberOfPages = division.length;
            res.send(toFront);

        }) 
        .catch((err) => res.json(err))
}

module.exports.getAll.blueprint = `
## GET ${PATH}/     or     api${PATH}?pages=number&offset=number
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
        type: 'costumers',
        attributes: [{
          _id: '545362362',
          name: 'Bruce',
          surname: 'Banner',
          photoURL: 'https://i.imgur.com/mszCGXY.jpg',
          createdBy: 'StanL Fri May 04 2018 12:41:25 GMT+0100 (Hora de verano GMT)',
          lastModified: 'StanL Fri May 04 2018 13:08:41 GMT+0100 (Hora de verano GMT)'
        }]
      },
      links: { self: 'Link', prev: 'Link', next: 'Link', first: 'link', last: 'link' },
      numberOfPages: 1
    }
`

function getByID(req,res){

    COSTUMERModel.findById(req.params.id).
    then(response => res.send(JAPI.createJAR('costumer',response,response._id)))
    .catch(err => res.sendStatus(404))
}

module.exports.getByID.blueprint = `
## GET ${PATH}/:id
+ Response 200 (application/json)
  {
    data: {
      type: 'costumer',
      id: '13',
      attributes: {
        _id: '13',
        name: 'Bruce',
        surname: 'Banner',
        photoURL: 'https://i.imgur.com/mszCGXY.jpg',
        createdBy: 'StanL Fri May 04 2018 12:41:25 GMT+0100 (Hora de verano GMT)',
        lastModified: 'StanL Fri May 04 2018 13:08:41 GMT+0100 (Hora de verano GMT)'
      }
    }
  }
`

function create(req,res){

    let author = req.auth.username
    const newCostumer = req.body;
    let date = new Date();
    newCostumer.createdBy= author +' '+ date;
    newCostumer.lastModified = author +' '+ date;
    
    COSTUMERModel.create(newCostumer).
        then(response => res.send(JAPI.createJAR('costumer', response, response._id)))
        .catch(err => res.json(err))
}

module.exports.create.blueprint = `
## POST ${PATH}/
+ Request (application/json)
  + Body
    {
        *name: 'Bruce',    *required file
        *surname: 'Banner',
        photoURL: 'https://i.imgur.com/mszCGXY.jpg',
    }
+ Response 201 (application/json)
{
    data: {
      type: 'costumer',
      id: '13',
      attributes: {
        _id: '13',
        name: 'Bruce',
        surname: 'Banner',
        photoURL: 'https://i.imgur.com/mszCGXY.jpg',
        createdBy: 'StanL Fri May 04 2018 12:41:25 GMT+0100 (Hora de verano GMT)',
        lastModified: 'StanL Fri May 04 2018 13:08:41 GMT+0100 (Hora de verano GMT)'
      }
    }
  }
`

function deleteByID(req,res){

    COSTUMERModel.findById(req.params.id)
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

    let author = req.auth.username;
    let date = new Date();
    req.body.lastModified = author +' '+ date;
    let config = { new: true, runValidators: true };

    COSTUMERModel.findOneAndUpdate({_id: req.params.id}, req.body, config)
        .then(updated => res.send(JAPI.createJAR('costumer', updated, updated._id)))
        .catch(err => res.json(err))
}

module.exports.updateByID.blueprint = `
## PATCH ${PATH}/:id
+ Request (application/json)

    Any field to update

+ Response 200 (application/json)
{
  data: {
    type: 'costumer',
    id: '13',
    attributes: {
      _id: '13',
      name: 'Bruce',
      surname: 'Banner',
      photoURL: 'https://i.imgur.com/mszCGXY.jpg',
      createdBy: 'StanL Fri May 04 2018 12:41:25 GMT+0100 (Hora de verano GMT)',
      lastModified: 'StanL Fri May 04 2018 13:08:41 GMT+0100 (Hora de verano GMT)'
    }
  }
}

*This is the resource with the new information updated
`