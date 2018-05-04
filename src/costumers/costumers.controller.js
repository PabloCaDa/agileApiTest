const COSTUMERModel = require('./costumers.model')
const JAPI = require('../services/jsonapi')
const _ = require('lodash')

module.exports = {
    getAllCostumers : getAllCostumers,
    getCostumersByID : getCostumersByID,
    createCostumers : createCostumers,
    deleteCostumers : deleteCostumers,
    editCostumers : editCostumers
}

function getAllCostumers(req,res){

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

function getCostumersByID(req,res){

    COSTUMERModel.findById(req.params.id).
    then(response => res.send(JAPI.createJAR('costumer',response,response._id)))
    .catch(err => res.sendStatus(404))
}

function createCostumers(req,res){

    let author = req.auth.username
    const newCostumer = req.body;
    let date = new Date();
    newCostumer.createdBy= author +' '+ date;
    newCostumer.lastModified = author +' '+ date;
    
    COSTUMERModel.create(newCostumer).
        then(response => res.send(JAPI.createJAR('costumer', response, response._id)))
        .catch(err => res.json(err))
}

function deleteCostumers(req,res){

    COSTUMERModel.findById(req.params.id)
        .then(response => {
            response.remove();
            res.sendStatus(200);
        })
        .catch(err => res.sendStatus(404))
}

function editCostumers(req,res){

    let author = req.auth.username;
    let date = new Date();
    req.body.lastModified = author +' '+ date;
    let config = { new: true, runValidators: true };

    COSTUMERModel.findOneAndUpdate({_id: req.params.id}, req.body, config)
        .then(updated => res.send(JAPI.createJAR('costumer', updated, updated._id)))
        .catch(err => res.json(err))
}