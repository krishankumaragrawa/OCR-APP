const asyncHandler = require('express-async-handler')
const vision = require('@google-cloud/vision');
const Citizen = require('../models/citizenModel')


const createCitizen = asyncHandler(async(req, res) => {
    const citizenExists = await Citizen.findOne({identification_number: req.body.idNumber})
    const {
        idNumber, 
        name, 
        last_name, 
        date_of_birth, 
        date_of_issue, 
        date_of_expiry
    } = req.body

    
    if(citizenExists){
        citizenExists.name = name || citizenExists.name
        citizenExists.last_name = last_name || citizenExists.last_name
        citizenExists.date_of_birth = date_of_birth || citizenExists.date_of_birth
        citizenExists.date_of_issue = date_of_issue || citizenExists.date_of_issue
        citizenExists.date_of_expiry = date_of_expiry || citizenExists.date_of_expiry
        await citizenExists.save()

    } else {
        const citizen = await Citizen.create({
            identification_number: idNumber, 
            name, 
            last_name, 
            date_of_birth, 
            date_of_issue,  
            date_of_expiry
        })

        try{
            res.status(201).json(citizen)
        } catch (error) {
            res.status(400)
            throw new Error('Unable to Save') 
        }
    }

    try{
        res.status(201).json(citizenExists)
    } catch (error) {
        res.status(400)
        throw new Error('Unable to Save')
    }
})

const getCitizen = async(req, res) => {
    const citizen = await Citizen.findOne({identification_number: req.body.idNumber})
    if(citizen){
        res.json(citizen)
    } else{
        res.status(404)
        throw new Error('Citizen not found')
    }
}

const deleteCitizen = async(req, res) => {
    const citizen = await Citizen.findOne({identification_number: req.body.idNumber})
    if(citizen) {
        await citizen.remove()
        res.json({message: 'Citizen removed'})
    } else {
        res.status(404)
        throw new Error('Citizen not found')
    }
}

module.exports = {createCitizen, getCitizen, deleteCitizen}