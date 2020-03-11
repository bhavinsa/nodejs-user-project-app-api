const mongoose = require('mongoose')
const Project = require('../models/Project')
const User = require('../models/User')
const Comment = require('../models/Comment')
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
            // const result = await Project.findOne({ "_id": req.body.projectId }).populate('members creator').exec();
            const data = await Project.aggregate([
                { $match: { "_id": mongoose.Types.ObjectId(req.body.projectId), 'isDeleted': false } },
                {
                    $lookup: {
                        from: "users",
                        localField: "creator",
                        foreignField: "_id",
                        as: "users"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$users", 0] }, "$$ROOT"] } }
                },
                {
                    $lookup: {
                        from: "comments",
                        localField: "_id",
                        foreignField: "projectId",
                        as: "comments"
                    }
                },
                {
                    $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$comments", 0] }, "$$ROOT"] } }
                },
                {
                    $project: {
                        'comment': 0
                    }
                },
            ]);
            const result = data ? data[0] : [];
            if (result) {
                const comments = result.comments ? result.comments : []
                let userIds = []
                comments.filter(data => {
                    userIds.push(mongoose.Types.ObjectId(data.creatorId));
                })

                const members = result ? result.members : []
                const memberUserIds = members.filter(data => mongoose.Types.ObjectId(data))
                userIds = [...memberUserIds, ...userIds];
                const userData = await User.find({
                    '_id': {
                        $in: userIds
                    },
                    'isDeleted': false
                })

                comments.filter(data => {
                    data.userInfo = userData.find(user => {
                        return mongoose.Types.ObjectId(user._id).valueOf().toString() == mongoose.Types.ObjectId(data.creatorId).valueOf().toString()
                    })
                })

                let membersInfo = [];
                members.filter(data => {
                    const member = userData.find(user => {
                        return mongoose.Types.ObjectId(user._id).valueOf().toString() == mongoose.Types.ObjectId(data).valueOf().toString()
                    })
                    membersInfo.push(member);
                })

                result[0] ? result[0].membersInfo = membersInfo : []
            }
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
    },

    comment: async (req, res) => {
        try {
            const comment = new Comment({
                comment: req.body.comment,
                creatorId: req.user.id,
                projectId: req.body.projectId
            })
            const commentData = await comment.save();
            res.status(201).send(commentData);
        } catch (error) {
            res.status(400).send({
                'message': error.message, 'stack': error.stack
            });
        }
    }

}

module.exports = project;
