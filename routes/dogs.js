var express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
var router = express.Router();
const {validateOwner} = require("./validators");


router.get('/:dogId(\\d+)', asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { dogId } = req.params;
    const dog = await db.Dog.findByPk(dogId, {include: [{model: db.Task}]});
    if (!dog) {
        const err = new Error("Dog not found");
        next(err);
    } else {
        const permCheck = validateOwner(req, dog);
        if(!permCheck) {
            return res.status(401).end();
        }
        console.log(dog);
        res.json(dog);
    }
}));

router.put('/dogs/:dogId(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const dogId = req.params.dogId;
    const dog = await db.Dog.findByPk(dogId);
    if (!dog) {
        const err = new Error("Dog not found");
        next(err);
    } else {
        const permCheck = validateOwner(req, dog);
        if(!permCheck) {
            return res.status(401).end();
        }
        const { userId } = req.session.auth;
        const { dogName, breedId } = req.body;
        const dog = await db.Dog.update({
            owner_id: userId,
            name: dogName,
            breed_id: breedId,
        });
        res.json(dog);
    }
}));

router.delete('/dogs/:dogId(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const dogId = req.params.dogId;
    const dog = await db.Dog.findByPk(dogId);
    if (!dog) {
        const err = new Error("Dog not found");
        next(err);
    } else {
        const permCheck = validateOwner(req, dog);
        if(!permCheck) {
            return res.status(401).end();
        }
        await dog.destroy();
        res.status(204).end();
    }
}));

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const dogs = await db.Dog.findAll({where: {owner_id: userId}, include: [{model: db.Breed}]});
    res.json(dogs);
}));

router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { dogName, breedId } = req.body;
    const dog = await db.Dog.create({
        owner_id: userId,
        name: dogName,
        breed_id: breedId,
    });
    res.json(dog);
}));




module.exports = router;
