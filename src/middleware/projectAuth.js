const Project = require('../models/Project')
const mongoose = require('mongoose')

const projectAuth = async (req, res, next) => {
    try {
        const project = await Project.findOne({ 'creator': mongoose.Types.ObjectId(req.user.id), isDeleted: false })
        if (!project) {
            throw new Error('No Project found.')
        }
        req.project = project
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
module.exports = projectAuth