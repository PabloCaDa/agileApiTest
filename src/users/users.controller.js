const USERModel = require('./users.model')
const JAPI = require('../services/jsonapi')
const crypto = require('crypto');
const _ = require('lodash')


module.exports = {
    getAllUsers : getAllUsers,
    getUsersByID : getUsersByID,
    createUsers : createUsers,
    deleteUsers : deleteUsers,
    editUsers : editUsers
}

function getAllUsers(req,res){

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

function getUsersByID(req,res){

    USERModel.findById(req.params.id).
        then(response => res.json(JAPI.createJAR('user',response,response._id)))
        .catch(err => res.sendStatus(404))
}

function createUsers(req,res){

    const newUser = req.body;
    newUser.password = crypto.createHash('sha256').update(newUser.password).digest('hex');

    USERModel.create(newUser).
        then(response => res.send(JAPI.createJAR('user', response, response._id)))
        .catch(err => res.json(err))

}

function deleteUsers(req,res){

    USERModel.findById(req.params.id)
        .then(response => {           
            response.remove();
            res.sendStatus(200);
        })
        .catch(err => res.sendStatus(404))

}

function editUsers(req,res){

    let config = { new: true, runValidators: true };

    USERModel.findOneAndUpdate({_id: req.params.id}, req.body, config)
        .then(updated => res.send(JAPI.createJAR('user', updated, updated._id)))
        .catch(err => res.json(err))
}

