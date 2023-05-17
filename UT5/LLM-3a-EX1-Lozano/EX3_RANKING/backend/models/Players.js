import mongoose from "mongoose";
const Schema = mongoose.Schema;

const playersSchema = new Schema({
    nickname: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
},
    { versionKey: false }
);

playersSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

const Players = mongoose.model('Players', playersSchema);
export default Players;