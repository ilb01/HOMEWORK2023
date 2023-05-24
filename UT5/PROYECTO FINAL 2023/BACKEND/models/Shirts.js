import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shirtsSchema = new Schema({
    id:{
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    league: {
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true,
    }

},
    { versionKey: false }
);

shirtsSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

const Shirts = mongoose.model('Shirts', shirtsSchema);
export default Shirts;