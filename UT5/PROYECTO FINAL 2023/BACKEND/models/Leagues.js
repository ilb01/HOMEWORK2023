import mongoose from "mongoose";
const Schema = mongoose.Schema;

const leaguesSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    league: {
        type: String,
        required: true
    }
}, 
{ versionKey: false }
);

leaguesSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

const Leagues =  mongoose.model('Leagues', leaguesSchema);
export default Leagues;