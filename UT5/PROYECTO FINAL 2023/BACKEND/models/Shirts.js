import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shirtsSchema = new Schema({
    img:{
        type:String,
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
        type: mongoose.Schema.ObjectId,
        ref: 'Leagues'
    },
    league_name:{
        type: String,
        required:true,
    },
    sizes : {
        type:Array,
        required:true
    },
    img:{
        type: String,
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