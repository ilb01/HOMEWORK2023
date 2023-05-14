import mongoose from "mongoose";
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: 'no description'
    }
},
    { versionKey: false }
);

coursesSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

const Courses = mongoose.model('Courses', coursesSchema);
export default Courses;