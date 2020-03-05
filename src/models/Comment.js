const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
        trim: true
    },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })


// commentSchema.statics.findProject = async (id) => {
//     const project = await Project.findOne({ '_id': id, isDeleted: false })
//     if (!project) {
//         throw new Error('Invalid project details')
//     }
//     const membersArr = project.members.map(ele => {
//         return new mongoose.Types.ObjectId(ele.id).valueOf().toString();
//     });
//     project.membersArr = membersArr;
//     return project
// }

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment