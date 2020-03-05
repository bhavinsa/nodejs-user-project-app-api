const Project = require('../models/Project')
const project = {
    create: async (req, res) => {
        try {
            var project = new Project(
                {
                    name: req.body.name,
                    creator: req.user,
                    members: (req.body.members) ? req.body.members.split(',') : [],
                    description: req.body.description,
                });
            const result = await project.save();
            res.status(201).send({ result })
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    },

    addMembers: async (req, res) => {
        try {
            const projectData = await Project.findProject(req.body.projectId);
            const member = req.body.members.split(',');
            const projectMember = [...projectData.members, ...member];
            projectData.members = projectMember;
            projectData.save();
            res.status(201).send(projectData);
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    },

    removeMembers: async (req, res) => {
        try {
            const projectData = await Project.findProject(req.body.projectId);
            const inputMember = req.body.members.split(',');
            const projectMember = projectData.membersArr.filter(member => {
                if (inputMember.includes(member) == true) {
                    return false;
                }
                return true;
            })
            projectData.members = projectMember;
            projectData.save();
            res.status(201).send(projectData);
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    },

    getProject: async (req, res) => {
        try {
            const result = await Project.findOne({ "_id": req.body.projectId }).populate('members creator').exec();
            res.status(201).send(result);
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    },

    delete: async (req, res) => {
        try {
            const projectData = await Project.findProject(req.body.projectId);
            projectData.isDeleted = true;
            projectData.save();
            res.status(201).send(projectData);
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    },

    assigned: async (req, res) => {
        try {
            const projectData = await Project.find({ 'members': { "$in": [req.user._id] }, 'isDeleted': false }).populate('members creator').exec();
            res.status(201).send(projectData);
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    },

    search: async (req, res) => {
        try {
            const projectData = await Project.find({ 'members': { "$in": [req.user._id] }, 'isDeleted': false, "name": new RegExp(req.body.searchKey, "i") }).populate('members creator').exec();
            res.status(201).send(projectData);
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    }

}

module.exports = project;
