const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })


projectSchema.statics.findProject = async (id) => {
    const project = await Project.findOne({ '_id': id, isDeleted: false })
    if (!project) {
        throw new Error('Invalid project details')
    }
    const membersArr = project.members.map(ele => {
        return new mongoose.Types.ObjectId(ele.id).valueOf().toString();
    });
    project.membersArr = membersArr;
    return project
}

const Project = mongoose.model('Project', projectSchema)
module.exports = Project